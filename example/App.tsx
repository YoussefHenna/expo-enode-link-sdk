import { StyleSheet, Text, View } from 'react-native';

import * as ExpoEnodeLinkSDK from 'expo-enode-link-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoEnodeLinkSDK.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
