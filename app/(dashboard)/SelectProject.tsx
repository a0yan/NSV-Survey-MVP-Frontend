import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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

type PIU = { id: string; name: string; roId: string };
type RO = { id: string; name: string };

// Sample data
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
  const [selectedRO, setSelectedRO] = useState<string | null>(null);
  const [selectedPIU, setSelectedPIU] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredPIUs = selectedRO ? pius.filter(piu => piu.roId === selectedRO) : [];
  const filteredProjects = selectedPIU ? projects.filter(p => p.piuId === selectedPIU) : [];

  return (
    <SafeAreaView className="flex-1 bg-[#f4f8ff] px-4">
      {/* Header */}
      <View className="items-center mb-6 mt-4">
        <View className="bg-indigo-100 rounded-full w-20 h-20 items-center justify-center shadow-md mb-3">
          <MaterialCommunityIcons name="road-variant" size={44} color="#2563eb" />
        </View>
        <Text className="text-2xl font-extrabold text-[#1f2937] mb-1">Select a Project</Text>
        <Text className="text-base text-gray-500">Start your highway survey</Text>
      </View>

      {/* RO Picker */}
      <Text className="mb-1 font-semibold text-[#1f2937]">Select Regional Office</Text>
      <View className="bg-white rounded-xl mb-4 shadow-sm">
        <Picker
          selectedValue={selectedRO}
          onValueChange={(value:any) => {
            setSelectedRO(value);
            setSelectedPIU(null);
            setSelectedProject(null);
          }}
        >
          <Picker.Item label="-- Choose RO --" value={null} />
          {ros.map(ro => (
            <Picker.Item key={ro.id} label={ro.name} value={ro.id} />
          ))}
        </Picker>
      </View>

      {/* PIU Picker */}
      {selectedRO && (
        <>
          <Text className="mb-1 font-semibold text-[#1f2937]">Select PIU</Text>
          <View className="bg-white rounded-xl mb-4 shadow-sm">
            <Picker
              selectedValue={selectedPIU}
              onValueChange={(value:any) => {
                setSelectedPIU(value);
                setSelectedProject(null);
              }}
            >
              <Picker.Item label="-- Choose PIU --" value={null} />
              {filteredPIUs.map(piu => (
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
                className={`bg-white p-4 rounded-2xl mb-4 border ${
                  isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
                } shadow-sm`}
                onPress={() => setSelectedProject(item)}
              >
                <Text className="text-lg font-bold text-[#1f2937]">{item.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">{item.subtitle}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* Project Details */}
      {selectedProject && (
        <View className="bg-[#f4f8ff] mt-2">
          <Text className="text-xl font-bold text-[#1f2937] mb-1">{selectedProject.title}</Text>
          <Text className="text-sm text-gray-500 mb-3">{selectedProject.subtitle}</Text>

          <View className="bg-white px-5 py-4 rounded-2xl shadow-md mb-6">
            <DetailItem label="Start Chainage" value={selectedProject.data.startChainage} />
            <DetailItem label="End Chainage" value={selectedProject.data.endChainage} />
            <DetailItem label="Road Length" value={selectedProject.data.roadLength} />
            <DetailItem label="Road Type" value={selectedProject.data.roadType} />
            <DetailItem label="Contract Value" value={selectedProject.data.contractValue} />
          </View>

          <View className="flex-row gap-x-3">
            <TouchableOpacity
              className="bg-[#2563eb] rounded-xl py-3 flex-1 items-center shadow-sm"
              onPress={() => console.log('Start Survey')}
            >
              <Text className="text-white font-semibold text-base">Start Survey</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-[#2563eb] rounded-xl py-3 flex-1 items-center shadow-sm"
              onPress={() => console.log('View Report')}
            >
              <Text className="text-[#2563eb] font-semibold text-base">View Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <View className="mb-3">
    <Text className="text-sm text-gray-500">{label}</Text>
    <Text className="text-base font-medium text-[#1f2937]">{value}</Text>
  </View>
);

export default SelectProject;
