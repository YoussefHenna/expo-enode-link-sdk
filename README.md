# expo-enode-link-sdk

An Expo Module integration for Enode's Link SDK

## Android

The Enode SDK requires Android SDK version 34+ and the minimum SDK 23+. It is required to add this to your app's `app.json` under `plugins`.

```json
[
  "expo-build-properties",
  {
    "android": {
      "minSdkVersion": 23,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34,
      "buildToolsVersion": "34.0.0"
    }
  }
]
```
If not already installed, you'll also need to install `expo-build-properties`
```
npx expo install expo-build-properties
```
## IOS

The enode SDK uses bluetooth and therefore you need to add this in your app's `app.json` under `ios`.

```json
"infoPlist": {
  "NSBluetoothAlwaysUsageDescription": "Our app requires Bluetooth to connect with energy devices, enabling efficient device management and enhanced user experience."
}
```

## Usage
Install the package
```
npx expo install @youssefhenna/expo-enode-link-sdk
```
Import the package
```ts
import * as ExpoEnodeLinkSDK from "@youssefhenna/expo-enode-link-sdk";
```
Listen to the result events by:
```tsx
React.useEffect(() => {
  const resultListener = ExpoEnodeLinkSDK.listenToResult(
    (code, errorMessage) => {
      // Add your code here to handle the result
    }
  );
  return () => resultListener.remove();
}, []);
```

Launch/Show the Enode Link UI
```ts
ExpoEnodeLinkSDK.show("<YOUR_TOKEN_HERE>")
```
