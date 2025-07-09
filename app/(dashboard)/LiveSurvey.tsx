import Table, { TableColumn } from "@/components/ui/Table";
import ToggleButton from "@/components/ui/Toggle";
import { useApi } from "@/hooks/useApi";
import useLiveLocation from "@/hooks/useLocation";
import { useProject } from "@/hooks/useProject";
import { DistressData } from "@/interface/DistressData";
import { GeneralMetaResponse } from "@/interface/GeneraMetaResponse";
import { Ionicons } from "@expo/vector-icons";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
  const { project , isProjectActive} = useProject();
  
  const projectId = "90"; // Get project ID from context or set to empty string if not available
  // const projectId = "1ee51074-afe0-4300-bb03-ea34afdee412"; // Replace with actual project ID if needed
  const axios = useApi();
  const [distressData, setDistressData] = useState<DistressData[]>([]);
  // Chainage start logic: start at 1, increment by 100
  const [chainageData, setChainageData] = useState<ChainageData>({ chainageStart: "1", chainageEnd: "" });
  const [chainageCounter, setChainageCounter] = useState<number>(1);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [startLocation, setStartLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isLeft, setIsLeft] = useState(true); // State to track selected lane (left or right)
  const checkLocationLoaded = () => {
    let loaded = location === undefined || location === null || location.latitude === 0 ? false : true;
    return loaded;
  };

  // --- Start/End LatLong and Chainage window tracking ---
  // LatLong window
  const startLatLongRef = useRef<{ latitude: number; longitude: number } | null>(null);
  const [startLatLong, setStartLatLong] = useState<{ latitude: number; longitude: number } | null>(null);
  const [endLatLong, setEndLatLong] = useState<{ latitude: number; longitude: number } | null>(null);
  const [msg,setMsg]=useState<string>("");
  // Chainage window
  const startChainageRef = useRef<number>(1);
  const [startChainage,setStartChainage]=useState(1)
  
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





  // Clubbed useEffect for LatLong and Chainage window logic
  useEffect(() => {
    if (!liveLocation) return;
        axios
      .post("/nsv/distresses/distress-data", {
        latitude: liveLocation.latitude.toString(),
        longitude: liveLocation.longitude.toString(),
        project_id: projectId,
      })
      .then((response: AxiosResponse<GeneralMetaResponse<DistressData[]>>) => {
        console.log("Distress data sent successfully:", response);
        setDistressData(response.data.data || []);
        for (const item of response.data.data || []) {
          setChainageData({
            chainageStart: item.start_chainage_m,
            chainageEnd: item.end_chainage_m,
          });
          break;
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    setLocation({
      latitude: liveLocation?.latitude || 0,
      longitude: liveLocation?.longitude || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    if (startLocation == null||startLatLongRef.current==null||(startLatLongRef.current?.latitude === liveLocation?.latitude&& startLatLongRef.current?.longitude === liveLocation?.longitude)) {
      setStartLocation({
        latitude: liveLocation.latitude || 0,
        longitude: liveLocation.longitude || 0,
      });
      startLatLongRef.current = {
        latitude: liveLocation.latitude || 0,
        longitude: liveLocation.longitude || 0,
      }
      return;
    }



    // --- LatLong and Chainage window logic (combined API) ---
    const currentLatLong = {
      latitude: liveLocation.latitude,
      longitude: liveLocation.longitude,
    };
      // Prepare chainage data if available

      const endChainage=startChainageRef.current+100;
      // Send all segment data to API
      console.log("Sending segment to API", {
        startLatLong: startLatLongRef.current,
        endLatLong: currentLatLong,
        startChainage: startChainageRef.current,
        endChainage: endChainage
      });
      sendSegmentToAPI(
        startLatLongRef.current,
        currentLatLong,
        startChainageRef.current,
        endChainage
      );
      // Move window forward for latlong
      setStartLatLong(startLatLongRef.current);
      setEndLatLong(currentLatLong);
      setStartChainage(startChainageRef.current);
      startLatLongRef.current = currentLatLong;
      startChainageRef.current += 100
  }, [liveLocation]);

  // --- API sender for combined segment ---
  const sendSegmentToAPI = async (
    startLatLong: { latitude: number; longitude: number } | null,
    endLatLong: { latitude: number; longitude: number } | null,
    startChainage: number | null,
    endChainage: number | null
  ) => {
    try {
      axios.post("/nsv/distresses/add-distress-data",{
          start_latitude: startLatLong?.latitude,
          start_longitude: startLatLong?.longitude,
          end_latitude: endLatLong?.latitude,
          end_longitude: endLatLong?.longitude,
          start_chainage_m: startChainage,
          end_chainage_m: endChainage,}).then((response:AxiosResponse<GeneralMetaResponse<{}>>) => {
            setMsg(response.data.msg);
          });
    } catch (error) {
      console.error("Segment API send error", error);
      setMsg("ERROR "+error);
    }
  };

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
      return acc;    }, { L: [], R: [] });
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
      <View className="bg-gray-50 rounded-xl mx-4 mt-3 p-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-medium text-gray-700">
            Auto-Send Data
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">START CHAINAGE-SEND</Text>
            <Text className="text-sm font-medium text-red-300">{startChainage}</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">END CHAINAGE-SEND </Text>
            <Text className="text-sm font-medium text-green-300">
              {startChainage + 100}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">START LAT LONG</Text>
            <Text className="text-sm font-medium text-green-500">
              {startLatLong ? `${startLatLong.latitude}, ${startLatLong.longitude}` : "N/A" }
            </Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">END LAT LONG</Text>
            <Text className="text-sm font-medium text-red-600">
              {endLatLong ? `${endLatLong.latitude}, ${endLatLong.longitude}` : "N/A"}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-gray-400 mt-1">MSG</Text>
        <Text className="text-xs text-gray-500">{msg}</Text>
      </View>
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
      <TouchableOpacity className="bg-green-600 rounded-lg mx-4 mt-4 py-3 items-center">
        <Text className="text-white text-base font-bold">
          + Add New Observation
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
    </ScrollView>
    </SafeAreaView>
  );
};
export default LiveGPSSurveyScreen;
