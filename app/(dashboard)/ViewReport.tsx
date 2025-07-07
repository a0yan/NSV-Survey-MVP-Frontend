// app/dashboard/ViewReport.tsx

import { useApi } from '@/hooks/useApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  // You can replace this with token from secure storage/context
  const project_id = '7b094a86-7da3-4771-b67f-a42f1c0f8d13';

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response =  await axios.get(
          '/nsv/inspections/prev-inspection-data',
          {
            params: { project_id: project_id },
          }
        );
        setInspections(response.data.data);
        console.log(response.data); // Log the fetched data for debugging
      } catch (error) {
        console.error('Error fetching inspections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    // <SafeAreaView style={styles.safeArea}>
    <SafeAreaView className='flex-1 mx-3'>
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
