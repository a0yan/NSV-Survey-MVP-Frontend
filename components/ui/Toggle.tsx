// ToggleButton.tsx
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';


type ToggleButtonProps = {
  onToggle: (isLeft: boolean) => void;
};

export default function ToggleButton({ onToggle }: ToggleButtonProps) {
  const [isLeft, setIsLeft] = useState(true);

  const handleToggle = (value: boolean) => {
    setIsLeft(value);
    onToggle(value); // 🔁 Send value to parent
  };

  return (
    <View className="flex-row items-center justify-center my-4">
      <Pressable
        onPress={() => handleToggle(true)}
        className={`px-6 py-2 rounded-l-full ${
          isLeft ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <Text className={isLeft ? 'text-white' : 'text-gray-700'}>LHS</Text>
      </Pressable>

      <Pressable
        onPress={() => handleToggle(false)}
        className={`px-6 py-2 rounded-r-full ${
          !isLeft ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <Text className={!isLeft ? 'text-white' : 'text-gray-700'}>RHS</Text>
      </Pressable>
    </View>
  );
}
