(function(t,u){typeof exports=="object"&&typeof module!="undefined"?u(exports,require("dompurify")):typeof define=="function"&&define.amd?define(["exports","dompurify"],u):(t=typeof globalThis!="undefined"?globalThis:t||self,u(t.VueDOMPurifyHTML={},t.DOMPurify))})(this,function(t,u){"use strict";function m(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var y=m(u);function v(e,o){var n;const f=(n=e.hooks)!=null?n:{};let i;for(i in f){const d=f[i];d!==void 0&&o.addHook(i,d)}}function r(e={}){const o=y.default();v(e,o);const f=function(i,n){var c,p;const d=n.arg,s=e.namedConfigurations,l=(c=e.default)!=null?c:{};if(s&&d!==void 0){i.innerHTML=o.sanitize(n.value,(p=s[d])!=null?p:l);return}i.innerHTML=o.sanitize(n.value,l)};return{mounted:f,updated:f}}const a={install(e,o={}){e.directive("dompurify-html",r(o))}};t.buildVueDompurifyHTMLDirective=r,t.default=a,t.vueDompurifyHTMLPlugin=a,Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"});