import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoEnodeLinkSDKViewProps } from './ExpoEnodeLinkSDK.types';

const NativeView: React.ComponentType<ExpoEnodeLinkSDKViewProps> =
  requireNativeViewManager('ExpoEnodeLinkSDK');

export default function ExpoEnodeLinkSDKView(props: ExpoEnodeLinkSDKViewProps) {
  return <NativeView {...props} />;
}
