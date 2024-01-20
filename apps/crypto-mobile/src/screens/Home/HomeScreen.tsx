import React from 'react';

import { useWebSocketService } from '@/hooks/useWebSocketService';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SafeScreen from '../../components/template/safe-screen/SafeScreen';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps) {
  const {
    heartbeatHistory,
    tickerHistory,
    requestForQuoteHistory,
    sendJsonMessage,
    connectionStatus,
  } = useWebSocketService();

  const handleSubscribe = () => {
    sendJsonMessage({
      type: 'subscribe',
      product_ids: ['ETH-USD', 'BTC-USD', 'LTC-USD'],
      channels: ['ticker', 'heartbeat', 'rfq_matches'],
    });
  };

  const handleUnsubscribe = () => {
    sendJsonMessage({
      type: 'unsubscribe',
      channels: ['ticker', 'heartbeat', 'rfq_matches'],
    });
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Ticker</Text>
        <ScrollView style={styles.tickerContainer}>
          <Text
            style={{
              color: 'black',
            }}
          >
            {JSON.stringify(tickerHistory.reverse().slice(0, 1))}
          </Text>
        </ScrollView>
        <Text>Heartbeat</Text>
        <ScrollView style={styles.heartbeatContainer}>
          <Text
            style={{
              color: 'black',
            }}
          >
            {JSON.stringify(heartbeatHistory.reverse().slice(0, 1))}
          </Text>
        </ScrollView>
        <Text>Request For Quote</Text>
        <ScrollView style={styles.rfqContainer}>
          <Text
            style={{
              color: 'black',
            }}
          >
            {JSON.stringify(requestForQuoteHistory.reverse().slice(0, 1))}
          </Text>
        </ScrollView>
        <View style={styles.controlContainer}>
          <Text>Connection Status: {connectionStatus}</Text>
          <Button title="Subscribe" onPress={handleSubscribe} />
          <Button title="Unsubscribe" onPress={handleUnsubscribe} />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  tickerContainer: {
    padding: 10,
    height: '30%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
  },
  heartbeatContainer: {
    padding: 10,
    height: '10%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
  },
  rfqContainer: {
    padding: 10,
    height: '20%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
  },
  controlContainer: {
    paddingTop: 10,
  },
});

export default HomeScreen;
