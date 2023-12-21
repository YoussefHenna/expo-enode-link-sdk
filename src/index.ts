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
  | "unknownError";

type OnResultEvent = { code: ResultCode; errorMessage?: string };

const ON_RESULT_EVENT_NAME = "OnResult";

const emitter = new EventEmitter(
  ExpoEnodeLinkSDKModule ?? NativeModulesProxy.ExpoEnodeLinkSDK
);

export function show(
  token: string,
  onResult: (code: ResultCode, errorMessage?: string) => void
) {
  emitter.removeAllListeners(ON_RESULT_EVENT_NAME);
  emitter.addListener<OnResultEvent>(ON_RESULT_EVENT_NAME, (event) => {
    onResult(event.code, event.errorMessage);
    emitter.removeAllListeners(ON_RESULT_EVENT_NAME);
  });

  ExpoEnodeLinkSDKModule.show(token);
}

export { ResultCode };
