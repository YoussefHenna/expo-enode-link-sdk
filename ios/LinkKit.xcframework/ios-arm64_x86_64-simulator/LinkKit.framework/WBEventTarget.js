/*jslint
    browser
*/
/*global
    atob, Event, uk, window
*/
//
// We need an EventTarget implementation. This one nicked wholesale from
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
//
!function(){"use strict";var t=enode.wbutils;window.nslog("Build EventTarget"),t.EventTarget=function(){this.listeners={}},t.EventTarget.prototype={addEventListener:function(t,e){void 0===this.listeners[t]&&(this.listeners[t]=[]),this.listeners[t].push(e)},removeEventListener:function(e,n){var i=this.listeners[e];if(void 0!==i){var s=i.length;let t;for(t=0;t<s;t+=1)if(i[t]===n)return i.splice(t,1),this.removeEventListener(e,n)}},dispatchEvent:function(t){var e=this.listeners[t.type];void 0!==e&&(t.currentTarget=this,e.forEach(function(e){try{e.handleEvent?e.handleEvent(t):e.call(this,t)}catch(t){console.error(`Exception dispatching to callback ${e}: `+t)}}))}}}();