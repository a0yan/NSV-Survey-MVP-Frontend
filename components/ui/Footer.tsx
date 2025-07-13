// components/Footer.tsx

import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Footer = () => {
  return (
    <View className="my-8 items-center">
      <Text className="text-xs text-gray-500">
        © {new Date().getFullYear()} NSV Inspection App
      </Text>
      <Pressable
        className="mt-1"
      >
        <Text className="text-sm text-gray-500">
          Made with ❤️ by Ayan & Harshal
        </Text>
      </Pressable>
    </View>
  );
};

export default Footer;
