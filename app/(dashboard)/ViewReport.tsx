// app/dashboard/ViewReport.tsx

import { useApi } from '@/hooks/useApi';
import { useProject } from '@/hooks/useProject';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SurveyCard from '../component/SurveyCard';

interface InspectionData {
  id: string;
  project_id: string;
  inspection_date: string;
  remarks: string;
  inspection_by: string;
  inspection_duration: string;
  video_link?: string;
  created_at: string;
}

const ViewReport = () => {
  const [inspections, setInspections] = useState<InspectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const axios=useApi()
  const isFocused = useIsFocused();
  const { project } = useProject();
  // You can replace this with token from secure storage/context
  // const project_id = '7b094a86-7da3-4771-b67f-a42f1c0f8d13';
  const project_id = project?.id || ''; // Use project ID from context or state

  useEffect(() => {
    const fetchInspections = async () => {
      console.log("ViewReport: Fetching inspections for project_id:", project_id);
      setLoading(true);
      try {
        const response =  await axios.get(
          '/nsv/inspections/prev-inspection-data',
          {
            params: { project_id: project_id },
          }
        );
        setInspections(response.data.data);
        console.log("ViewReport: Inspection data:",response.data); // Log the fetched data for debugging
      } catch (error) {
        console.error('Error fetching inspections:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) {
      fetchInspections();
    }
    return () => {
      setInspections([]); // Clear inspections on unmount
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    // <SafeAreaView style={styles.safeArea}>
    <SafeAreaView className='flex-1 bg-[#f4f8ff] px-3'>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer} className='justify-center items-center'>
          <View className="bg-indigo-100 rounded-full w-12 h-12 items-center justify-center shadow-md mb-2">
            <MaterialCommunityIcons name="road-variant" size={30} color="#2563eb" />
          </View>
          <Text style={styles.header}>Inspections</Text>
        </View>
        
        {inspections.map((inspection) => (
          <SurveyCard key={inspection.id} inspection={inspection} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewReport;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    paddingBottom: 10,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
