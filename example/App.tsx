import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ExpoEnodeLinkSDK from "expo-enode-link-sdk";

export default function App() {
  const [resultCode, setResultCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>();

  React.useEffect(() => {
    ExpoEnodeLinkSDK.show("<TOKEN_HERE>", (code, errorMessage) => {
      setResultCode(code);
      setErrorMessage(errorMessage);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text> Code: {resultCode} </Text>
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
