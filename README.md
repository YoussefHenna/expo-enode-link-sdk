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
