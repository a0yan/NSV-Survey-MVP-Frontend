import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
type LoaderProps = {
  loading: boolean;
  children?: React.ReactNode;
};

const Loader: React.FC<LoaderProps> = ({ loading, children }): React.ReactElement => {
   if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <>{children}</>;
}

export default Loader

const styles = StyleSheet.create({
    loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
