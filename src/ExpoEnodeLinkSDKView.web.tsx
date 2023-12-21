import * as React from 'react';

import { ExpoEnodeLinkSDKViewProps } from './ExpoEnodeLinkSDK.types';

export default function ExpoEnodeLinkSDKView(props: ExpoEnodeLinkSDKViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
