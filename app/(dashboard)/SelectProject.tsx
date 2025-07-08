import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProject } from "@/hooks/useProject";
import { PIU, Project, RO } from "@/context/ProjectContext";
import { useApi } from "@/hooks/useApi";
import { GeneralMetaResponse } from "@/interface/GeneraMetaResponse";
import { useRouter } from "expo-router";


const SelectProject = () => {
  const router = useRouter();

  const axios = useApi();
  const {
    ros,
    ro,
    setRo,
    pius,
    piu,
    setPiu,
    projects,
    project,
    setProject,
    setROs,
    setPIUs,
    setProjects,
    setLoading,
    isProjectActive,
    activeProject
  } = useProject();

  useEffect(() => {
    fetchROs();
  }, []);

  useEffect(() => {
    if (ro) fetchPIUs(ro.id);
  }, [ro]);

  useEffect(() => {
    if (piu) fetchProjects(piu.id);
  }, [piu]);

  const fetchROs = async () => {
    try {
      const res = await axios.get<GeneralMetaResponse<RO[]>>("/nsv/master/ro-list");
      setROs(res.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching ROs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPIUs = async (roId: string) => {
    try {
      const res = await axios.get<GeneralMetaResponse<PIU[]>>(
        `/nsv/master/piu-list?ro_id=${roId}`
      );
      setPIUs(res.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching PIUs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async (piuId: string) => {
    try {
      const res = await axios.get<GeneralMetaResponse<Project[]>>(
        `/nsv/master/project-list?piu_id=${piuId}`
      );
      setProjects(res.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActiveProject = (active: boolean) => {
    console.log("handleActiveProject called with:", active);
    activeProject(active);
    if (!active){
      setProjects([]);
      setPiu(null);
      setProject(null);
    }
  }

  const handleSelectProject = (proj: Project) => {
    setProject(proj);
    activeProject(false); // Reset activation
  };

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <View className="mb-3">
      <Text className="text-base text-[#1f2937]">{label}</Text>
      <Text className="text-xs font-medium text-gray-500 ">
        {value ?? "—"}
      </Text>
    </View>
  );

  const formatEpochDate = (epochStr: string | number) => {
    console.log("formatEpochDate called with:", epochStr);
    const epoch = Number(epochStr) * 1000; // Convert seconds → milliseconds
    if (isNaN(epoch)) return "—";
    const date = new Date(epoch);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderItem = ({ item }: ListRenderItemInfo<Project>) => (
    <TouchableOpacity
      className={`bg-white p-4 rounded-2xl mb-4 border ${
        project?.id === item.id
          ? "border-indigo-600 bg-indigo-50"
          : "border-gray-200"
      } shadow-sm`}
      onPress={() => handleSelectProject(item)}
    >
      <Text className="text-lg font-semibold text-[#1f2937]">
        {item.project_name}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">UPC: {item.upc}</Text>
    </TouchableOpacity>
  );

  const listHeader = (
    <>
      {/* Header */}
      <View className="items-center mb-6 mt-4">
        <View className="bg-indigo-100 rounded-full w-20 h-20 items-center justify-center shadow-md mb-3">
          <MaterialCommunityIcons name="road-variant" size={44} color="#2563eb" />
        </View>
        <Text className="text-4xl font-extrabold text-[#1f2937] mb-1">
          Select a Project
        </Text>
        <Text className="text-base text-gray-500">
          Start your highway survey
        </Text>
      </View>

      {/* RO Picker */}
      <Text className="text-xl mb-1 font-extrabold text-[#1f2937]">Select Regional Office</Text>
      <View className="bg-white rounded-xl mb-4 shadow-sm">
        <Picker
          selectedValue={ro?.id || ""}
          onValueChange={(value: string) => {
            const selected = ros.find((r) => r.id === value) || null;
            setRo(selected);
            setPiu(null);
            setProjects([]);
          }}
        >
          <Picker.Item label="-- Choose RO --" value="" />
          {ros.map((ro) => (
            <Picker.Item key={ro.id} label={ro.ro_name} value={ro.id} />
          ))}
        </Picker>
      </View>

      {/* PIU Picker */}
      {ro && (
        <>
          <Text className="text-xl mb-1 font-extrabold text-[#1f2937]">Select PIU</Text>
          <View className="bg-white rounded-xl mb-4 shadow-sm">
            <Picker
              selectedValue={piu?.id || ""}
              onValueChange={(value: string) => {
                const selected = pius.find((p) => p.id === value) || null;
                setPiu(selected);
              }}
            >
              <Picker.Item label="-- Choose PIU --" value="" />
              {pius.map((piu) => (
                <Picker.Item key={piu.id} label={piu.piu_name} value={piu.id} />
              ))}
            </Picker>
          </View>
            {pius.length === 0 && (
              <Text className="text-red-500 font-bold mb-4 text-center">No PIUs available for this RO</Text>
            )}
        </>
      )}

      {piu && projects.length !== 0&&(
        <Text className="text-xl mb-2 font-extrabold text-[#1f2937]">Select Project:</Text>
      )}
      {projects.length === 0 && piu &&(
        <Text className="text-red-500 font-bold text-center mt-4">
          No projects available for this PIU
        </Text>
      )}
      
    </>
  );

  const listFooter = (
    <>
      {project && !isProjectActive && (
        <TouchableOpacity
          className="bg-indigo-600 rounded-xl py-3 items-center"
          // onPress={() => setIsProjectActive(true)}
          onPress={() => handleActiveProject(true)}
        >
          <Text className="text-white font-semibold text-base">
            Activate Project
          </Text>
        </TouchableOpacity>
      )}

      {project && isProjectActive && (
        <View className="bg-white p-5 rounded-2xl shadow-md mt-6 mb-8">
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-extrabold text-[#1f2937]">
              Active Project Details:
            </Text>
            <TouchableOpacity onPress={() => handleActiveProject(false)}>
              <Text className="text-red-500 font-medium">Deactivate</Text>
            </TouchableOpacity>
          </View>
          <Text className="font-extrabold text-[#1f2937] mb-2">
            {project.project_name}            
          </Text>
          <DetailItem label="UPC" value={project.upc} />
          <DetailItem label="NH-No." value={project.nh_number} />
          <DetailItem label="Year" value={project.year} />
          <DetailItem label="Cycle" value={project.cycle} />
          <DetailItem label="Concessionaire" value={project.concessionaire} />
          <DetailItem label="Completion Year" value={formatEpochDate(project.completion_year)} />
          <DetailItem label="Mode" value={project.mode} />
          <DetailItem label="Length" value={project.length} />
          <DetailItem label="AE/IE" value={project["ae/ie"]} />
        </View>
      )}
      { project && isProjectActive && (
        <View className="flex-row justify-center items-center mt-4 mb-8 w-full space-x-4 gap-3">
          <TouchableOpacity
            className="flex-1 bg-blue-600 rounded-lg py-3 items-center"
            onPress={() => router.push("/(dashboard)/LiveSurvey")} // Replace with your actual route
          >
            <Text className="text-white text-base font-bold tracking-wide">
              Start Live Survey
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 border border-indigo-600 rounded-lg py-3 items-center"
            onPress={() => router.push("/(dashboard)/ViewReport")} // Replace with your actual route
          >
            <Text className="text-blue-600 text-base font-bold tracking-wide">
              View Report
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f4f8ff] px-4">
      <FlatList
        data={projects.slice(0, 4)} // only show max 4 projects
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SelectProject;
