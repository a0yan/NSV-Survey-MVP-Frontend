import { useTailwindTheme } from '@/hooks/useTailwindThemeColors';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ThemedView = ({safe=false,...props}) => {
  const tailwindThemeClass=useTailwindTheme()('background');
  if(!safe){
    return (
      <View className={`${tailwindThemeClass}`} {...props}>
      </View>
    )
  }
  const insets=useSafeAreaInsets()
  return(
    <View className={`${tailwindThemeClass}`} {...props}
    style={[{
      paddingTop:insets.top,
      paddingBottom:insets.bottom
      }]}>
    </View>
  )
}

export default ThemedView