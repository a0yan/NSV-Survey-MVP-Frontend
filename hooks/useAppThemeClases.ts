import { useColorScheme } from "react-native";
import { colors } from '../constants/appColors';

export function useAppTheme() {
  const colorScheme = useColorScheme() || 'light';

  return (key: keyof typeof colors) => {
     const value = colors[key]?.[colorScheme];
    if (!value) {
      console.warn(`Color key ${key} not found for ${colorScheme}`);
    }
    return value;
  };
}