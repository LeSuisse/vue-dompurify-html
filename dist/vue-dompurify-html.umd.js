!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("dompurify")):"function"==typeof define&&define.amd?define(["dompurify"],n):(e="undefined"!=typeof globalThis?globalThis:e||self).VueDOMPurifyHTML=n(e.DOMPurify)}(this,(function(e){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=n(e);return{install(e,n={}){e.directive("dompurify-html",function(e={}){const n=t.default();!function(e,n){const t=e.hooks;let i;for(i in t)n.addHook(i,t[i])}(e,n);const i=function(t,i){const o=i.arg,u=e.namedConfigurations;u&&void 0!==u[o]?t.innerHTML=n.sanitize(i.value,u[o]):t.innerHTML=n.sanitize(i.value,e.default)};return{mounted:i,updated:i}}(n))}}}));
