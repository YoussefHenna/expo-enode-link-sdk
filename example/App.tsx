import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ExpoEnodeLinkSDK from "expo-enode-link-sdk";

const TOKEN = "<TOKEN_HERE>";

export default function App() {
  const [resultCode, setResultCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>();

  React.useEffect(() => {
    const resultListener = ExpoEnodeLinkSDK.listenToResult(
      (code, errorMessage) => {
        setResultCode(code);
        setErrorMessage(errorMessage);
      }
    );
    return () => resultListener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Launch" onPress={() => ExpoEnodeLinkSDK.show(TOKEN)} />
      <Text style={{ marginTop: 20 }}> Code: {resultCode} </Text>
      <Text> Error Message: {errorMessage} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
