import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LiveGPSSurveyScreen=()=> {
  // Example state for live location and survey data
  const [location, setLocation] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  // Example survey data
  const surveyData = {
    chainage: 'CH 12+450',
    nextChainage: 'CH 12+475',
    distanceToNext: '25.8m',
    roadWidth: '12.5m',
    shoulderWidth: '2.0m',
    surfaceType: 'Bituminous',
    condition: 'Good',
    lastUpdated: 'Today, 2:45 PM',
    observations: [
      { icon: 'alert-circle-outline', label: 'Pothole detected', time: '1 min ago', chainage: 'CH 12+456' },
      { icon: 'water-outline', label: 'Drainage check', time: '2 min ago', chainage: 'CH 12+450' },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-6 pb-2">
        <Text className="text-lg font-semibold">Live GPS Survey</Text>
        <View className="flex-row items-center">
          <Text className="text-xs text-green-600 mr-2">Connected • GPS Active</Text>
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
        {/* Map controls */}
        <View className="absolute right-2 top-2 space-y-2">
          <TouchableOpacity className="bg-white rounded-full p-2 shadow">
            <Ionicons name="add" size={20} color="#22223b" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full p-2 shadow">
            <Ionicons name="remove" size={20} color="#22223b" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full p-2 shadow">
            <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
        {/* GPS label */}
        <View className="absolute left-2 top-2 bg-white/90 rounded px-2 py-0.5 flex-row items-center">
          <Ionicons name="locate" size={14} color="#2563eb" />
          <Text className="text-xs ml-1 text-[#2563eb]">GPS: 2.2m</Text>
        </View>
      </View>
      {/* Lat/Lon */}
      <View className="flex-row justify-between px-4 mb-2">
        <View>
          <Text className="text-xs text-gray-400">LATITUDE</Text>
          <Text className="text-sm font-medium">28.6139° N</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400">LONGITUDE</Text>
          <Text className="text-sm font-medium">77.2090° E</Text>
        </View>
      </View>
      {/* Chainage and Distance */}
      <View className="flex-row justify-between items-center bg-orange-50 px-4 py-2">
        <View>
          <Text className="text-xs text-gray-400">CURRENT CHAINAGE</Text>
          <Text className="text-lg font-bold text-orange-600">{surveyData.chainage}</Text>
          <Text className="text-xs text-gray-400">NH-44, Sector 15-16</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-400">DISTANCE TO NEXT</Text>
          <Text className="text-lg font-bold text-orange-600">{surveyData.distanceToNext}</Text>
          <Text className="text-xs text-gray-400">{surveyData.nextChainage}</Text>
        </View>
      </View>
      {/* Survey Data Card */}
      <View className="bg-gray-50 rounded-xl mx-4 mt-3 p-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-medium text-gray-700">Auto-fetched Survey Data</Text>
          <TouchableOpacity className="flex-row items-center px-2 py-0.5">
            <Ionicons name="pencil-outline" size={16} color="#2563eb" />
            <Text className="text-xs text-[#2563eb] ml-1">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">ROAD WIDTH</Text>
            <Text className="text-sm font-medium">{surveyData.roadWidth}</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">SHOULDER WIDTH</Text>
            <Text className="text-sm font-medium">{surveyData.shoulderWidth}</Text>
          </View>
        </View>
        <View className="flex-row justify-between mb-1">
          <View>
            <Text className="text-xs text-gray-400">SURFACE TYPE</Text>
            <Text className="text-sm font-medium">{surveyData.surfaceType}</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">CONDITION</Text>
            <Text className="text-sm font-medium text-green-600">{surveyData.condition}</Text>
          </View>
        </View>
        <Text className="text-xs text-gray-400 mt-1">LAST UPDATED</Text>
        <Text className="text-xs text-gray-500">{surveyData.lastUpdated}</Text>
      </View>
      {/* Recent Observations */}
      <View className="bg-white rounded-xl mx-4 mt-3 p-3 border border-gray-100">
        <Text className="font-medium text-gray-700 mb-2">Recent Observations</Text>
        {surveyData.observations.map((obs, idx) => (
          <View key={idx} className="flex-row items-center mb-1.5">
            <MaterialCommunityIcons name={obs.icon as any} size={18} color="#f59e42" />
            <Text className="ml-2 text-sm font-medium text-gray-700">{obs.label}</Text>
            <Text className="ml-2 text-xs text-gray-400">({obs.chainage} • {obs.time})</Text>
          </View>
        ))}
      </View>
      {/* Add New Observation Button */}
      <TouchableOpacity className="bg-green-600 rounded-lg mx-4 mt-4 py-3 items-center">
        <Text className="text-white text-base font-bold">+ Add New Observation</Text>
      </TouchableOpacity>
      {/* Action Buttons */}
      <View className="flex-row mx-4 mt-3 mb-6 gap-2">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 rounded-lg py-3">
          <Ionicons name="camera-outline" size={18} color="#22223b" />
          <Text className="ml-2 text-base font-medium text-gray-700">Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 rounded-lg py-3">
          <Ionicons name="cloud-upload-outline" size={18} color="#22223b" />
          <Text className="ml-2 text-base font-medium text-gray-700">Sync Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default LiveGPSSurveyScreen;
