// import React from 'react'
// import { ThemedText } from '@/components/ThemedText'
// import { ThemedView } from '@/components/ThemedView'

// function Profile() {
//   return (
//         <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ThemedText>Profile</ThemedText>
//         </ThemedView>
//       )
// }

// export default Profile

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const user = {
  username: 'john_doe',
  role: 'Surveyor',
};

function Profile() {
  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-[#f4f8ff] items-center justify-center p-4">
      <View className="items-center mb-8">
        <View className="bg-indigo-100 rounded-2xl w-16 h-16 items-center justify-center mb-3">
          <MaterialCommunityIcons name="road-variant" size={40} color="#2563eb" />
        </View>
        <Text className="text-2xl font-bold text-[#22223b] mb-0.5">Profile</Text>
        <Text className="text-base text-gray-500 mb-2">Highway Survey</Text>
      </View>
      <View className="bg-white rounded-2xl p-6 w-[340px] shadow-md items-stretch">
        <View className="flex-row items-center mb-4">
          <Ionicons name="person-circle-outline" size={28} color="#2563eb" style={{ marginRight: 10 }} />
          <View>
            <Text className="text-base text-gray-500">Username</Text>
            <Text className="text-lg font-bold text-[#22223b]">{user.username}</Text>
          </View>
        </View>
        <View className="flex-row items-center mb-6">
          <MaterialCommunityIcons name="account-alert-outline" size={24} color="#2563eb" style={{ marginRight: 10 }} />
          <View>
            <Text className="text-base text-gray-500">Role</Text>
            <Text className="text-lg font-bold text-[#22223b]">{user.role}</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-indigo-600 rounded-lg py-3 items-center mt-2"
          onPress={handleLogout}
        >
          <Text className="text-white text-base font-bold tracking-wide">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
