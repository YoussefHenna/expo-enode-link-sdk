import { NativeModulesProxy, EventEmitter } from "expo-modules-core";
import ExpoEnodeLinkSDKModule from "./ExpoEnodeLinkSDKModule";

type ResultCode =
  | "success"
  | "missingLinkToken"
  | "malformedLinkToken"
  | "dismissedViaDismissFunction"
  | "cancelledByUser"
  | "backendError"
  | "earlyExitRequestedFromFrontend"
  | "permissionError"
  | "unknownError";

type OnResultEvent = { code: ResultCode; errorMessage?: string };

const ON_RESULT_EVENT_NAME = "OnResult";

const emitter = new EventEmitter(
  ExpoEnodeLinkSDKModule ?? NativeModulesProxy.ExpoEnodeLinkSDK
);

export function listenToResult(
  onResult: (code: ResultCode, errorMessage?: string) => void
) {
  const listener = emitter.addListener<OnResultEvent>(
    ON_RESULT_EVENT_NAME,
    (event) => onResult(event.code, event.errorMessage)
  );
  return { remove: () => listener.remove() };
}

export function show(token: string) {
  ExpoEnodeLinkSDKModule.show(token);
}

export { ResultCode };
