import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import SafeScreen from '../../components/template/safe-screen/SafeScreen';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps) {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text
          style={{
            color: 'black',
          }}
        >
          Welcome to HomeScreen!
        </Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
