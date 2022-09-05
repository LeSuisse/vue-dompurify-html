import c from "dompurify";
import { isVue3 as m } from "vue-demi";
function p(n, i) {
  var u;
  const o = (u = n.hooks) != null ? u : {};
  let t;
  for (t in o) {
    const e = o[t];
    e !== void 0 && i.addHook(t, e);
  }
}
function l() {
  return c();
}
function v(n = {}, i = l) {
  const o = i();
  p(n, o);
  const t = function(u, e) {
    var f, d;
    if (e.oldValue === e.value)
      return;
    const r = e.arg, a = n.namedConfigurations, s = (f = n.default) != null ? f : {};
    if (a && r !== void 0) {
      u.innerHTML = o.sanitize(
        e.value,
        (d = a[r]) != null ? d : s
      );
      return;
    }
    u.innerHTML = o.sanitize(e.value, s);
  };
  return m ? {
    mounted: t,
    updated: t
  } : {
    inserted: t,
    update: t,
    unbind: (u) => {
      u.innerHTML = "";
    }
  };
}
const y = {
  install(n, i = {}, o = l) {
    n.directive(
      "dompurify-html",
      v(i, o)
    );
  }
};
export {
  v as buildVueDompurifyHTMLDirective,
  y as default,
  y as vueDompurifyHTMLPlugin
};
