(function(n,u){typeof exports=="object"&&typeof module!="undefined"?module.exports=u(require("dompurify")):typeof define=="function"&&define.amd?define(["dompurify"],u):(n=typeof globalThis!="undefined"?globalThis:n||self,n.VueDOMPurifyHTML=u(n.DOMPurify))})(this,function(n){"use strict";function u(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var p=u(n);function l(e,t){var i;const f=(i=e.hooks)!=null?i:{};let o;for(o in f){const d=f[o];d!==void 0&&t.addHook(o,d)}}function m(e={}){const t=p.default();l(e,t);const f=function(o,i){var a,c;const d=i.arg,r=e.namedConfigurations,s=(a=e.default)!=null?a:{};if(r&&d!==void 0){o.innerHTML=t.sanitize(i.value,(c=r[d])!=null?c:s);return}o.innerHTML=t.sanitize(i.value,s)};return{mounted:f,updated:f}}var y={install(e,t={}){e.directive("dompurify-html",m(t))}};return y});
