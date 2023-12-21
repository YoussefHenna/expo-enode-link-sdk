import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoEnodeLinkSDK.web.ts
// and on native platforms to ExpoEnodeLinkSDK.ts
import ExpoEnodeLinkSDKModule from './ExpoEnodeLinkSDKModule';
import ExpoEnodeLinkSDKView from './ExpoEnodeLinkSDKView';
import { ChangeEventPayload, ExpoEnodeLinkSDKViewProps } from './ExpoEnodeLinkSDK.types';

// Get the native constant value.
export const PI = ExpoEnodeLinkSDKModule.PI;

export function hello(): string {
  return ExpoEnodeLinkSDKModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoEnodeLinkSDKModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoEnodeLinkSDKModule ?? NativeModulesProxy.ExpoEnodeLinkSDK);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoEnodeLinkSDKView, ExpoEnodeLinkSDKViewProps, ChangeEventPayload };
