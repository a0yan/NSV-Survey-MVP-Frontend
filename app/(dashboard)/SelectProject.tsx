import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ import SafeAreaView

type Project = {
  id: string;
  title: string;
  subtitle: string;
  piuId: string;
  data: {
    startChainage: string;
    endChainage: string;
    roadLength: string;
    roadType: string;
    contractValue: string;
  };
};

type PIU = {
  id: string;
  name: string;
  roId: string;
};

type RO = {
  id: string;
  name: string;
};

// Sample Data
const ros: RO[] = [
  { id: 'ro1', name: 'Mumbai RO' },
  { id: 'ro2', name: 'Delhi RO' },
];

const pius: PIU[] = [
  { id: 'piu1', name: 'Mumbai PIU A', roId: 'ro1' },
  { id: 'piu2', name: 'Mumbai PIU B', roId: 'ro1' },
  { id: 'piu3', name: 'Delhi PIU A', roId: 'ro2' },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'NH-48 Widening',
    subtitle: 'Mumbai-Pune Expressway',
    piuId: 'piu1',
    data: {
      startChainage: 'Km 10+000',
      endChainage: 'Km 30+000',
      roadLength: '20 Km',
      roadType: '6-Lane Highway',
      contractValue: '₹980 Crores',
    },
  },
  {
    id: '2',
    title: 'NH-66 Coastal Road',
    subtitle: 'Mumbai Coastal Highway',
    piuId: 'piu2',
    data: {
      startChainage: 'Km 15+200',
      endChainage: 'Km 42+800',
      roadLength: '27.6 Km',
      roadType: '4-Lane Divided',
      contractValue: '₹1,245 Crores',
    },
  },
  {
    id: '3',
    title: 'Delhi Ring Road',
    subtitle: 'Delhi Project A',
    piuId: 'piu3',
    data: {
      startChainage: 'Km 0+000',
      endChainage: 'Km 25+000',
      roadLength: '25 Km',
      roadType: 'Expressway',
      contractValue: '₹1,100 Crores',
    },
  },
];

const SelectProject = () => {
  const router = useRouter();

  const [selectedRO, setSelectedRO] = useState<string | null>(null);
  const [selectedPIU, setSelectedPIU] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredPIUs = selectedRO ? pius.filter(piu => piu.roId === selectedRO) : [];
  const filteredProjects = selectedPIU ? projects.filter(p => p.piuId === selectedPIU) : [];

  const handleContinue = () => {
    if (selectedProject) {
      router.push({
        pathname: '/project/ProjectDetails',
        params: {
          ...selectedProject.data,
          title: selectedProject.title,
          subtitle: selectedProject.subtitle,
        },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f8ff', paddingHorizontal: 16 }}>
      <View className="items-center mb-6 mt-4">
        <View className="bg-indigo-100 rounded-2xl w-16 h-16 items-center justify-center mb-3">
          <MaterialCommunityIcons name="road-variant" size={40} color="#2563eb" />
        </View>
        <Text className="text-2xl font-bold text-[#22223b] mb-0.5">Select Project</Text>
        <Text className="text-base text-gray-500">Highway Survey</Text>
      </View>

      {/* RO Dropdown */}
      <Text className="mb-1 font-semibold text-[#22223b]">Regional Office (RO)</Text>
      <View className="bg-white rounded-xl mb-4">
        <Picker
          selectedValue={selectedRO}
          onValueChange={(value) => {
            setSelectedRO(value);
            setSelectedPIU(null);
            setSelectedProject(null);
          }}
        >
          <Picker.Item label="Select RO" value={null} />
          {ros.map((ro) => (
            <Picker.Item key={ro.id} label={ro.name} value={ro.id} />
          ))}
        </Picker>
      </View>

      {/* PIU Dropdown */}
      {selectedRO && (
        <>
          <Text className="mb-1 font-semibold text-[#22223b]">Project Implementation Unit (PIU)</Text>
          <View className="bg-white rounded-xl mb-4">
            <Picker
              selectedValue={selectedPIU}
              onValueChange={(value) => {
                setSelectedPIU(value);
                setSelectedProject(null);
              }}
            >
              <Picker.Item label="Select PIU" value={null} />
              {filteredPIUs.map((piu) => (
                <Picker.Item key={piu.id} label={piu.name} value={piu.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Project List */}
      {selectedPIU && (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const isSelected = selectedProject?.id === item.id;
            return (
              <TouchableOpacity
                className={`bg-white border rounded-2xl p-4 mb-4 ${
                  isSelected ? 'border-[#2563eb] bg-indigo-50' : 'border-gray-200'
                }`}
                onPress={() => setSelectedProject(item)}
              >
                <Text className="text-lg font-bold text-[#22223b]">{item.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">{item.subtitle}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedProject}
        className={`rounded-lg py-4 items-center ${
          selectedProject ? 'bg-indigo-600' : 'bg-gray-300'
        }`}
      >
        <Text className="text-white font-bold text-base">Continue to Details →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectProject;
