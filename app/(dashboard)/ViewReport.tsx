// app/dashboard/ViewReport.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
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

  // You can replace this with token from secure storage/context
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWksySk5UUlQ0V0hORkc3TVMwU0tZTlYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUxOTE4OTMyfQ.ARfFH8G1NU1usFy-_UVateh6b6VhsjQUZgaxjuBai5g';
  const project_id = '7b094a86-7da3-4771-b67f-a42f1c0f8d13';

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get(
          'https://nsv-survey-mvp-backend-1.onrender.com/nsv/inspections/prev-inspection-data',
          {
            params: { project_id: project_id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
