/*jslint
        browser
*/
/*global
        atob, Event, nslog, uk, window
*/
//  Copyright 2020 David Park. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// adapted from chrome app polyfill https://github.com/WebBluetoothCG/chrome-app-polyfill

!function(){"use strict";const n=enode.wb,r=enode.wbutils;function t(t,e,i){if(void 0===t||void 0===e||void 0===i)throw new Error("Invalid call to BluetoothRemoteGATTService constructor");r.defineROProperties(this,{device:t,uuid:e,isPrimary:i})}t.prototype={getCharacteristic:function(e){let i=window.BluetoothUUID.getCharacteristic(e),r=this;return this.sendMessage("getCharacteristic",{data:{characteristicUUID:i}}).then(function(t){return nslog("Got characteristic "+e),new n.BluetoothRemoteGATTCharacteristic(r,i,t.properties)})},getCharacteristics:function(){let o=this;return this.sendMessage("getCharacteristics").then(function(e){var i=[];if(e)for(let t=0;t<e.length;t++){var r=e[t];r&&(r=window.BluetoothUUID.getCharacteristic(r),i.push(new n.BluetoothRemoteGATTCharacteristic(o,r)))}return i})},getIncludedService:function(){throw new Error("Not implemented")},getIncludedServices:function(){throw new Error("Not implemented")},sendMessage:function(t,e){return(e=e||{}).data=e.data||{},e.data.serviceUUID=this.uuid,this.device.gatt.sendMessage(t,e)},toString:function(){return`BluetoothRemoteGATTService(${this.device}, ${this.uuid}, ${this.isPrimary})`}},n.BluetoothRemoteGATTService=t}();