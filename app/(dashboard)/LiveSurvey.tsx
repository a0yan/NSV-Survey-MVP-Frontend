import GenericModal from "@/components/ui/Modal";
import Table, { TableColumn } from "@/components/ui/Table";
import ToggleButton from "@/components/ui/Toggle";
import { useApi } from "@/hooks/useApi";
import useLiveLocation from "@/hooks/useLocation";
import { useProject } from "@/hooks/useProject";
import { DistressData } from "@/interface/DistressData";
import { GeneralMetaResponse } from "@/interface/GeneraMetaResponse";
import { Ionicons } from "@expo/vector-icons";
import { AxiosResponse } from "axios";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
  const baseKeys = [
    { key: 'roughness_bi', label: 'Roughness' },
    { key: 'rut_depth_mm', label: 'Rut Depth' },
    { key: 'crack_area_pct', label: 'Crack Area' },
    { key: 'ravelling_area_pct', label: 'Ravelling Area' },
  ];
export interface ChainageData {
  chainageStart: string;
  chainageEnd: string;
  }
  type DistressRow = {
  label: string;
  [lane: string]: string | number | undefined; // L1, L2, R1, R2
};
export interface ActiveLaneResponse {
  L: string[];
  R: string[];
}


const LiveGPSSurveyScreen = () => {
  // Example state for live location and survey data
  const [activeLanesMap, setActiveLanesMap] = useState<ActiveLaneResponse | null>(null);

  const liveLocation = useLiveLocation();
  const { project ,surveyStartTime,isProjectActive} = useProject();
  
  const projectId = project?.id || ""; // Get project ID from context or set to empty string if not available
  // const projectId = "1ee51074-afe0-4300-bb03-ea34afdee412"; // Replace with actual project ID if needed
  const axios = useApi();
  const [distressData, setDistressData] = useState<DistressData[]>([]);
  const [chainageData, setChainageData] = useState<ChainageData>({ chainageStart: "", chainageEnd: "" });
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [remarks, setRemarks] = useState("");
  const [visible, setVisible] = useState(false); // State to control modal visibility
  const [isLeft, setIsLeft] = useState(true); // State to track selected lane (left or right)
  const checkLocationLoaded = () => {
    let loaded = location === undefined || location === null || location.latitude === 0 ? false : true;
    return loaded;
  };
const activeLanes = useMemo(() => {
  const selectedLane = isLeft ? 'L' : 'R';
  const lanes = activeLanesMap?.[selectedLane] || [];
  return [...lanes].sort(); // make a copy to avoid mutating state
}, [activeLanesMap, isLeft]);

const filteredDistressData: DistressRow[] = useMemo(() => {
  const laneMap = new Map<string, any>();
  distressData.forEach((d) => {
    laneMap.set(d.lane_code, d);
  });

  return baseKeys.map(({ key, label }) => {
    const row: DistressRow = { label };
    activeLanes.forEach((lane) => {
      row[lane] = laneMap.get(lane)?.[key] ?? '--';
    });
    return row;
  });
}, [distressData, activeLanes]);

const distressColumns: TableColumn<DistressRow>[] = useMemo(() => {
  return [
    { key: 'label', label: 'Distress Type' },
    ...activeLanes.map((lane) => ({
      key: lane,
      label: lane,
    })),
  ];
}, [activeLanes]);

const toggleModal = () => {
  console.log("Toggling modal visibility");
  setVisible(true)
}

const saveInspectionData=()=>{
  const endEpoch = Date.now();
  const durationEpoch=surveyStartTime==null?0:endEpoch-surveyStartTime;
  const duration=new Date(durationEpoch).toISOString().substr(11, 8); // Format duration as HH:MM:SS
  const data={
    inspection_date: String(Date.now()),
    remarks:remarks,
    duration:duration

  }
  setRemarks("");
  setVisible(false);
  axios.post("/nsv/inspections/add-inspection",data,{params: { project_id: projectId }})
  .then((res) => {
    console.log("Inspection data saved successfully" + res.data);
    router.navigate("/(dashboard)/SelectProject");
  })
  .catch((error) => {
    console.error("Error saving inspection data:", error);
  });
}





  // Update location state when liveLocation changes
  useEffect(() => {
    if(!liveLocation) 
      return;
    console.log("projectId", projectId);
    
    setLocation({
      latitude: liveLocation?.latitude || 0,
      longitude: liveLocation?.longitude || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });  
    axios
      .post("/nsv/distresses/distress-data", {
        // latitude: "80.034367",
        // longitude: "20.827996",
        latitude: liveLocation.latitude.toString(),
        longitude: liveLocation.longitude.toString(),
        project_id: projectId,
      })
      .then((response: AxiosResponse<GeneralMetaResponse<DistressData[]>>) => {
        console.log("Distress data sent successfully:", response);
  
        setDistressData(response.data.data||[]);
        if(response.data.data.length > 0) {
          setChainageData({
            chainageStart: response.data.data[0].start_chainage_m.toString(),
            chainageEnd: response.data.data[0].end_chainage_m.toString(),
          });
        }

      })
      .catch((error) => {
        console.error(error.message);
      });
    
  }, [liveLocation]);

  useEffect(() => {
  if (!projectId) return;

  axios
  .get<GeneralMetaResponse<any>>(
    `/nsv/master/lane_data`, // base endpoint
    {
      params: { project_id: projectId }, // query param
    }
  )
  .then((res) => {
    const laneMap=res.data.data.reduce((acc: ActiveLaneResponse, lane: any) => {
      if (lane.side === 'L') {
        acc.L.push(lane.lane_code);
      } else {
        acc.R.push(lane.lane_code);
      }
      return acc;
    }, { L: [], R: [] });
    setActiveLanesMap(laneMap);
  })
  .catch((err) => {
    console.error("Failed to fetch active lanes:", err.message);
  });
;
}, [projectId]);




  // Example survey data
  const surveyData = {
    chainage: "CH 12+450",
    nextChainage: "CH 12+475",
    distanceToNext: "25.8m",
    roadWidth: "12.5m",
    shoulderWidth: "2.0m",
    surfaceType: "Bituminous",
    condition: "Good",
    lastUpdated: "Today, 2:45 PM",
    observations: [
      {
        icon: "alert-circle-outline",
        label: "Pothole detected",
        time: "1 min ago",
        chainage: "CH 12+456",
      },
      {
        icon: "water-outline",
        label: "Drainage check",
        time: "2 min ago",
        chainage: "CH 12+450",
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f4f8ff]">
    <ScrollView className="flex-1 bg-[#f4f8ff]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-6 pb-2">
        <Text className="text-lg font-semibold">Live GPS Survey</Text>
        <View className="flex-row items-center">
          <Text
            className={`text-xs ${checkLocationLoaded() ? "text-green-600" : "text-red-600"} mr-2`}
          >
            {checkLocationLoaded()
              ? "Connected • GPS Active"
              : "Connecting • GPS Inactive"}
          </Text>
          <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
        </View>
      </View>
      {/* Map Section */}
      <View className="mx-4 rounded-2xl overflow-hidden h-48 mb-2">
        <MapView
          style={{ flex: 1, height: 192 }}
          region={location}
          showsUserLocation
          showsMyLocationButton
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
      <View className="flex-row justify-between px-4 mb-2">
        <View>
          <Text className="text-xs text-gray-400">LATITUDE</Text>
          <Text className="text-sm font-medium">{location.latitude}° N</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400">LONGITUDE</Text>
          <Text className="text-sm font-medium">{location.longitude}° E</Text>
        </View>
      </View>
      {/* Chainage and Distance */}
      <View className="flex-row justify-between items-center bg-white px-4 py-2">
        <View>
          <Text className="text-xs text-gray-400">START CHAINAGE</Text>
          <Text className="text-lg font-bold text-orange-600">
            {chainageData.chainageStart}
          </Text>
          <Text className="text-xs text-gray-400">NH-44, Sector 15-16</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-400">END CHAINAGE</Text>
          <Text className="text-lg font-bold text-orange-600">
            {chainageData.chainageEnd}
          </Text>
          <Text className="text-xs text-gray-400">
            {surveyData.nextChainage}
          </Text>
        </View>
      </View>
      {/* Survey Data Card */}
      {/* <View className="bg-gray-50 rounded-xl mx-4 mt-3 p-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-medium text-gray-700">
            Auto-fetched Survey Data
          </Text>
          <TouchableOpacity className="flex-row items-center px-2 py-0.5">
            <Ionicons name="pencil-outline" size={16} color="#2563eb" />
            <Text className="text-xs text-[#2563eb] ml-1">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">ROAD WIDTH</Text>
            <Text className="text-sm font-medium">{laneCodes.size}</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">SHOULDER WIDTH</Text>
            <Text className="text-sm font-medium">
              {surveyData.shoulderWidth}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">SURFACE TYPE</Text>
            <Text className="text-sm font-medium">
              {surveyData.surfaceType}
            </Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">CONDITION</Text>
            <Text className="text-sm font-medium text-green-600">
              {surveyData.condition}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-gray-400 mt-1">LAST UPDATED</Text>
        <Text className="text-xs text-gray-500">{surveyData.lastUpdated}</Text>
      </View> */}
      {/* Toggle */}
       <View>
      <ToggleButton onToggle={(value) => setIsLeft(value)} />
    </View>
      {/* Distress Assessment Table Example */}
      <View className="mx-4 mt-4 mb-2">
        {activeLanes.length !== 0 ? (
          <Table
            title="Distress Assessment"
            columns={distressColumns}
            data={filteredDistressData}
            rowKey={(_, idx) => idx}
          />
      ) : null}
      </View>
      {/* Recent Observations */}
      {/* <View className="bg-white rounded-xl mx-4 mt-3 p-3 border border-gray-100">
        <Text className="font-medium text-gray-700 mb-2">Recent Observations</Text>
        {surveyData.observations.map((obs, idx) => (
          <View key={idx} className="flex-row items-center mb-1.5">
            <MaterialCommunityIcons name={obs.icon as any} size={18} color="#f59e42" />
            <Text className="ml-2 text-sm font-medium text-gray-700">{obs.label}</Text>
            <Text className="ml-2 text-xs text-gray-400">({obs.chainage} • {obs.time})</Text>
          </View>
        ))}
      </View> */}
      {/* Add New Observation Button */}
      <TouchableOpacity onPress={() => toggleModal()} className="bg-red-500 rounded-lg mx-4 mt-4 py-3 items-center">
        <Text className="text-white text-base font-bold">
          Stop Inspection
        </Text>
      </TouchableOpacity>
      {/* Action Buttons */}
      <View className="flex-row mx-4 mt-3 mb-6 gap-2">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white rounded-lg py-3">
          <Ionicons name="camera-outline" size={18} color="#22223b" />
          <Text className="ml-2 text-base font-medium text-gray-700">
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white rounded-lg py-3">
          <Ionicons name="cloud-upload-outline" size={18} color="#22223b" />
          <Text className="ml-2 text-base font-medium text-gray-700">
            Sync Data
          </Text>
        </TouchableOpacity>
      </View>
       <GenericModal
        visible={visible}
        title="Inspection Completed Please enter remarks"
        onHandleCancel={() => setVisible(false)}
        onHandleSubmit={saveInspectionData}
      >
        <TextInput
          placeholder="Remarks"
          value={remarks}
          onChangeText={setRemarks}
          keyboardType="email-address"
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800"
        />
      </GenericModal>
    </ScrollView>
    </SafeAreaView>
  );
};
export default LiveGPSSurveyScreen;
