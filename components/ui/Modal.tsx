import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface GenericModalProps {
  visible: boolean;
  onHandleSubmit: () => void;
  onHandleCancel: () => void;
  title?: string;
  children?: React.ReactNode;
    isSubmitDisabled?: boolean; // 👈 Add this
}

const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onHandleSubmit,
  onHandleCancel,
  title = 'Enter Information',
  children,
  isSubmitDisabled = false, // 👈 Default to false
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onHandleCancel}
    >
      <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="w-full bg-white rounded-3xl p-6 shadow-lg max-w-md">
          <Text className="text-center text-lg font-semibold text-gray-800 mb-4">
            {title}
          </Text>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              onPress={onHandleCancel}
              className="flex-1 py-3 rounded-xl bg-gray-200 mr-2"
            >
              <Text className="text-center text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onHandleSubmit}
              className="flex-1 py-3 rounded-xl bg-blue-600 ml-2 disabled:bg-blue-300"
              disabled={isSubmitDisabled} // 👈 Add this
            >
              <Text className="text-center text-white font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
