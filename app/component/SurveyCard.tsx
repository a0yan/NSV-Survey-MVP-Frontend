import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // expo icons (or react-native-vector-icons)
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  inspection: {
    id: string;
    project_id: string;
    inspection_date: string;
    remarks: string;
    inspection_by: string;
    inspection_duration: string;
    video_link?: string;
    created_at: string;
  };
}

const SurveyCard = ({ inspection }: Props) => {
  const {
    inspection_date,
    remarks,
    inspection_by,
    inspection_duration,
    video_link,
  } = inspection;

  const openLink = (url: string | undefined) => {
    if (url) Linking.openURL(url);
  };

const formattedDate = new Date(Number(inspection_date)).toLocaleString(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true, // change to false if you want 24-hour format
});

  return (
    <View style={styles.card} >
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="clipboard-check" size={18} color="#2563eb" />
        <Text style={styles.headerText}>Inspection Details</Text>
      </View>

      {/* Info Rows */}
      <View style={styles.infoRow}>
        <MaterialIcons name="event" size={16} color="#4b5563" />
        <Text style={styles.infoText}>{formattedDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="person" size={16} color="#4b5563" />
        <Text style={styles.infoText}>{inspection_by}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="timer" size={16} color="#4b5563" />
        <Text style={styles.infoText}>{inspection_duration}</Text>
      </View>

      <View style={styles.remarksContainer}>
        <Text style={styles.remarksLabel}>Remarks:</Text>
        <Text style={styles.remarksText}>{remarks}</Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.downloadButton,
          { backgroundColor: video_link ? '#2563eb' : '#d1d5db' },
        ]}
        onPress={() => openLink(video_link)}
        disabled={!video_link}
      >
        <Text style={styles.buttonText}>
          {video_link ? 'Download Video' : 'Video Not Available'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SurveyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1f2937',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
  },
  remarksContainer: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  remarksLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  remarksText: {
    fontSize: 13,
    color: '#374151',
  },
  downloadButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
