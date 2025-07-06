// themeClasses.ts
import { useColorScheme } from 'react-native';

const themeClassMap = {
  text: {
    light: 'text-text-light',
    dark: 'text-text-dark',
  },
  background: {
    light: 'bg-background-light',
    dark: 'bg-background-dark',
  },
  primary: {
    light: 'bg-primary-light',
    dark: 'bg-primary-dark',
  },
  // Add more as needed
};

export function useThemeClass() {
  const colorScheme = useColorScheme() || 'light';

  return (key: keyof typeof themeClassMap) => {
    return themeClassMap[key][colorScheme];
  };
}
