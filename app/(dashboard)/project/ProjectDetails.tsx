import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProjectDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f0f4ff] p-4">
      <View className="items-center mb-6 mt-4">
        <View className="bg-indigo-100 rounded-2xl w-16 h-16 items-center justify-center mb-3">
          <MaterialCommunityIcons name="road-variant" size={40} color="#2563eb" />
        </View>
        
      </View>
      <Text className="text-2xl font-bold text-[#22223b] mb-1">{params.title}</Text>
      <Text className="text-base text-gray-500 mb-6">{params.subtitle}</Text>

      <View className="bg-white p-4 px-5 py-4 rounded-2xl mb-6">
        <DetailItem label="Start Chainage" value={params.startChainage} />
        <DetailItem label="End Chainage" value={params.endChainage} />
        <DetailItem label="Road Length" value={params.roadLength} />
        <DetailItem label="Road Type" value={params.roadType} />
        <DetailItem label="Contract Value" value={params.contractValue} />
      </View>

      <View className="flex-row gap-x-3">
        <TouchableOpacity
          className="bg-[#2563eb] rounded-lg py-3 flex-1 items-center"
          onPress={() => router.push('/StartSurvey')}
        >
          <Text className="text-white font-semibold text-base">Start Survey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-[#2563eb] rounded-lg py-3 flex-1 items-center"
          onPress={() => router.push('/ViewReport')}
        >
          <Text className="text-[#2563eb] font-semibold text-base">View Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <View className="mb-3">
    <Text className="text-sm text-gray-500">{label}</Text>
    <Text className="text-base font-medium text-[#22223b]">{value}</Text>
  </View>
);

export default ProjectDetails;
