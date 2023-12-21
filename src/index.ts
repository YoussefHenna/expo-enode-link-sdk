import { NativeModulesProxy, EventEmitter } from "expo-modules-core";
import ExpoEnodeLinkSDKModule from "./ExpoEnodeLinkSDKModule";

type ResultCode =
  | "success"
  | "missingLinkToken"
  | "malformedLinkToken"
  | "dismissedViaDismissFunction"
  | "cancelledByUser"
  | "backendError"
  | "earlyExitRequestedFromFrontend";

type OnResultEvent = { code: ResultCode; errorMessage?: string };

const onResultEventName = "OnResult";

const emitter = new EventEmitter(
  ExpoEnodeLinkSDKModule ?? NativeModulesProxy.ExpoEnodeLinkSDK
);

export function show(
  token: string,
  onResult: (code: ResultCode, errorMessage?: string) => void
) {
  emitter.removeAllListeners(onResultEventName);
  emitter.addListener<OnResultEvent>(onResultEventName, (event) => {
    onResult(event.code, event.errorMessage);
    emitter.removeAllListeners(onResultEventName);
  });

  ExpoEnodeLinkSDKModule.show(token);
}

export { ResultCode };
