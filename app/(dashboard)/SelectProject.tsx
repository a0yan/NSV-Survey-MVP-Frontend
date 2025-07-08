// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Project } from '@/context/ProjectContext';
// import { RO } from '@/context/ProjectContext';
// import { useProject } from '@/hooks/useProject';


// // type PIU = { id: string; name: string; roId: string };
// // type RO = { id: string; name: string };

// // Sample data
// // const ros: RO[] = [
// //   { id: 'ro1', name: 'Mumbai RO' },
// //   { id: 'ro2', name: 'Delhi RO' },
// // ];

// // const pius: PIU[] = [
// //   { id: 'piu1', name: 'Mumbai PIU A', roId: 'ro1' },
// //   { id: 'piu2', name: 'Mumbai PIU B', roId: 'ro1' },
// //   { id: 'piu3', name: 'Delhi PIU A', roId: 'ro2' },
// // ];


// // const projects: Project[] = [
//   //   {
//     //     id: '1',
//     //     title: 'NH-48 Widening',
//     //     subtitle: 'Mumbai-Pune Expressway',
// //     piuId: 'piu1',
// //     data: {
// //       startChainage: 'Km 10+000',
// //       endChainage: 'Km 30+000',
// //       roadLength: '20 Km',
// //       roadType: '6-Lane Highway',
// //       contractValue: '₹980 Crores',
// //     },
// //   },
// //   {
//   //     id: '2',
//   //     title: 'NH-66 Coastal Road',
//   //     subtitle: 'Mumbai Coastal Highway',
// //     piuId: 'piu2',
// //     data: {
// //       startChainage: 'Km 15+200',
// //       endChainage: 'Km 42+800',
// //       roadLength: '27.6 Km',
// //       roadType: '4-Lane Divided',
// //       contractValue: '₹1,245 Crores',
// //     },
// //   },
// //   {
//   //     id: '3',
// //     title: 'Delhi Ring Road',
// //     subtitle: 'Delhi Project A',
// //     piuId: 'piu3',
// //     data: {
//   //       startChainage: 'Km 0+000',
//   //       endChainage: 'Km 25+000',
//   //       roadLength: '25 Km',
//   //       roadType: 'Expressway',
//   //       contractValue: '₹1,100 Crores',
//   //     },
//   //   },
//   // ];
  
//   const SelectProject = () => {
//     // const [selectedRO, setSelectedRO] = useState<string | null>(null);
//     // const [selectedPIU, setSelectedPIU] = useState<string | null>(null);
//     // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
//     // const filteredPIUs = selectedRO ? pius.filter(piu => piu.roId === selectedRO) : [];
//     // const filteredProjects = selectedPIU ? projects.filter(p => p.piuId === selectedPIU) : [];
//     const [ros, ro, setRo, fetchROs, pius, piu, setPiu, fetchPIUs, projects, project, setProject, fetchProjects] = useProject()

//   return (
//     <SafeAreaView className="flex-1 bg-[#f4f8ff] px-4">
//       {/* Header */}
//       <View className="items-center mb-6 mt-4">
//         <View className="bg-indigo-100 rounded-full w-20 h-20 items-center justify-center shadow-md mb-3">
//           <MaterialCommunityIcons name="road-variant" size={44} color="#2563eb" />
//         </View>
//         <Text className="text-2xl font-extrabold text-[#1f2937] mb-1">Select a Project</Text>
//         <Text className="text-base text-gray-500">Start your highway survey</Text>
//       </View>

//       {/* RO Picker */}
//       <Text className="mb-1 font-semibold text-[#1f2937]">Select Regional Office</Text>
//       <View className="bg-white rounded-xl mb-4 shadow-sm">
//         <Picker
//           selectedValue={ro}
//           onValueChange={(value:any) => {
//             setRo(value);
//             setPiu(null);
//             setProject(null);
//           }}
//         >
//           <Picker.Item label="-- Choose RO --" value={null} />
//           {ros.map(ro => (
//             <Picker.Item key={ro.id} label={ro.name} value={ro.id} />
//           ))}
//         </Picker>
//       </View>

//       {/* PIU Picker */}
//       {ro && (
//         <>
//           <Text className="mb-1 font-semibold text-[#1f2937]">Select PIU</Text>
//           <View className="bg-white rounded-xl mb-4 shadow-sm">
//             <Picker
//               selectedValue={piu}
//               onValueChange={(value:any) => {
//                 setPiu(value);
//                 setProject(null);
//               }}
//             >
//               <Picker.Item label="-- Choose PIU --" value={null} />
//               {pius.map(piu => (
//                 <Picker.Item key={piu.id} label={piu.name} value={piu.id} />
//               ))}
//             </Picker>
//           </View>
//         </>
//       )}

//       {/* Project List */}
//       {piu && (
//         <FlatList
//           data={projects}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 24 }}
//           renderItem={({ item }) => {
//             const isSelected = project?.id === item.id;
//             return (
//               <TouchableOpacity
//                 className={`bg-white p-4 rounded-2xl mb-4 border ${
//                   isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
//                 } shadow-sm`}
//                 onPress={() => setProject(item)}
//               >
//                 <Text className="text-lg font-bold text-[#1f2937]">{item.title}</Text>
//                 <Text className="text-sm text-gray-500 mt-1">{item.subtitle}</Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       )}

//       {/* Project Details */}
//       {project && (
//         <View className="bg-[#f4f8ff] mt-2">
//           <Text className="text-xl font-bold text-[#1f2937] mb-1">{project.title}</Text>
//           <Text className="text-sm text-gray-500 mb-3">{project.subtitle}</Text>

//           <View className="bg-white px-5 py-4 rounded-2xl shadow-md mb-6">
//             <DetailItem label="Start Chainage" value={project.data.startChainage} />
//             <DetailItem label="End Chainage" value={project.data.endChainage} />
//             <DetailItem label="Road Length" value={project.data.roadLength} />
//             <DetailItem label="Road Type" value={project.data.roadType} />
//             <DetailItem label="Contract Value" value={project.data.contractValue} />
//           </View>

//           <View className="flex-row gap-x-3">
//             <TouchableOpacity
//               className="bg-[#2563eb] rounded-xl py-3 flex-1 items-center shadow-sm"
//               onPress={() => console.log('Start Survey')}
//             >
//               <Text className="text-white font-semibold text-base">Start Survey</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className="border border-[#2563eb] rounded-xl py-3 flex-1 items-center shadow-sm"
//               onPress={() => console.log('View Report')}
//             >
//               <Text className="text-[#2563eb] font-semibold text-base">View Report</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const DetailItem = ({ label, value }: { label: string; value: any }) => (
//   <View className="mb-3">
//     <Text className="text-sm text-gray-500">{label}</Text>
//     <Text className="text-base font-medium text-[#1f2937]">{value}</Text>
//   </View>
// );

// export default SelectProject;


import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProject } from '@/hooks/useProject';
import { PIU, Project, RO } from '@/context/ProjectContext';
import { useRouter } from 'expo-router';
// import { fetchPIUs, fetchProjects, fetchROs } from '../api/project';
import { useApi } from '@/hooks/useApi';
import { GeneralMetaResponse } from '@/interface/GeneraMetaResponse';


const SelectProject = () => {
  const axios = useApi();
  const {
    ros,
    ro,
    setRo,
    // fetchROs,
    pius,
    piu,
    setPiu,
    // fetchPIUs,
    projects,
    project,
    selectProject,
    // fetchProjects,
    setROs,
  setPIUs,
  setProjects,
  setLoading
  } = useProject();

  // const router = useRouter();

  // Fetch ROs on mount
  const fetchROs = async () => {
  try {
    const res = await axios.get<any>("/nsv/master/ro-list");
    console.log("Fetched ROs:", res);
    setROs(res.data?.data ?? []);
  } catch (error) {
    console.error("Error fetching ROs:", error);
  } finally {
    setLoading(false);
  }
};

  
    const fetchPIUs = async(roId: string) =>{
        try{
            const res = await axios.get<GeneralMetaResponse<PIU[]>>(`/nsv/master/piu-list?ro_id=${roId}`);
            setPIUs(res.data?.data ?? []);
        }catch (error) {
            console.error("Error fetching PIUs:", error);
        }finally {
            setLoading(false);
        }
      }

    const fetchProjects = async (piuId: string) => {
        try {
          const res = await axios.get<GeneralMetaResponse<Project[]>>(`/nsv/master/project-list?piu_id=${piuId}`);
          setProjects(res.data?.data ?? []);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {
    fetchROs();
  }, []);

  // Fetch PIUs when RO changes
  useEffect(() => {
    if (ro) {
      fetchPIUs(ro.id);
    }
  }, [ro]);

  // Fetch projects when PIU changes
  useEffect(() => {
    if (piu) {
      fetchProjects(piu.id);
    }
  }, [piu]);

  const handleSelectProject = (proj: Project) => {
    selectProject(proj);
    // router.push('/project/ProjectDetails');
  };

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
          selectedValue={ro?.id || ''}
          onValueChange={(value: string) => {
            const selected = ros.find(r => r.id === value) || null;
            setRo(selected);
            setPiu(null);
          }}
        >
          <Picker.Item label="-- Choose RO --" value="" />
          {ros.map(ro => (
            <Picker.Item key={ro.id} label={ro.ro_name} value={ro.id} />
          ))}
        </Picker>
      </View>

      {/* PIU Picker */}
      {ro && (
        <>
          <Text className="mb-1 font-semibold text-[#1f2937]">Select PIU</Text>
          <View className="bg-white rounded-xl mb-4 shadow-sm">
            <Picker
              selectedValue={piu?.id || ''}
              onValueChange={(value: string) => {
                const selected = pius.find(p => p.id === value) || null;
                setPiu(selected);
              }}
            >
              <Picker.Item label="-- Choose PIU --" value="" />
              {pius.map(piu => (
                <Picker.Item key={piu.id} label={piu.piu_name} value={piu.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Project List */}
      {piu && (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`bg-white p-4 rounded-2xl mb-4 border ${
                project?.id === item.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              } shadow-sm`}
              onPress={() => handleSelectProject(item)}
            >
              <Text className="text-lg font-bold text-[#1f2937]">{item.project_name}</Text>
              <Text className="text-sm text-gray-500 mt-1">UPC: {item.upc}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SelectProject;
