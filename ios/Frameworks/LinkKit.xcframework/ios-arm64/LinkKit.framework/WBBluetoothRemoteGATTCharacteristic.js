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

!function(){"use strict";const r=enode.wb,n=enode.wbutils;function t(t,e,i){t={service:t,properties:i,uuid:e};n.defineROProperties(this,t),this.value=null,n.EventTarget.call(this),r.native.registerCharacteristicForNotifications(this)}t.prototype={getDescriptor:function(){throw new Error("Not implemented")},getDescriptors:function(){throw new Error("Not implemented")},readValue:function(){let e=this;return this.sendMessage("readCharacteristicValue").then(function(t){return e.value=n.str64todv(t),e.value})},writeValue:function(t,e){t=new Uint8Array(t),e=e||"optional",t=n.uint8ArrayToBase64(t);return this.sendMessage("writeCharacteristicValue",{data:{value:t,responseMode:e}})},writeValueWithResponse:function(t){return this.writeValue(t,"required")},writeValueWithoutResponse:function(t){return this.writeValue(t,"never")},startNotifications:function(){return this.sendMessage("startNotifications").then(()=>this)},stopNotifications:function(){return this.sendMessage("stopNotifications").then(()=>this)},sendMessage:function(t,e){return(e=e||{}).data=e.data||{},e.data.characteristicUUID=this.uuid,this.service.sendMessage(t,e)},toString:function(){return`BluetoothRemoteGATTCharacteristic(${this.service.toString()}, ${this.uuid})`}},n.mixin(t,n.EventTarget),r.BluetoothRemoteGATTCharacteristic=t}();