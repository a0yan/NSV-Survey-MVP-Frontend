import { View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useAppTheme()("background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
