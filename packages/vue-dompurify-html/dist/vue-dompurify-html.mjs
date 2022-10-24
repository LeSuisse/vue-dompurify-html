import p from "dompurify";
import { isVue3 as v } from "vue-demi";
function H(o, r) {
  var e;
  const n = (e = o.hooks) != null ? e : {};
  let t;
  for (t in n) {
    const i = n[t];
    i !== void 0 && r.addHook(t, i);
  }
}
function m() {
  return p();
}
function k(o = {}, r = m) {
  const n = r();
  H(o, n);
  const t = function(e, i) {
    var c, l;
    const u = i.value;
    if (i.oldValue === u)
      return;
    const a = `${u}`, s = i.arg, d = o.namedConfigurations, f = (c = o.default) != null ? c : {};
    if (d && s !== void 0) {
      e.innerHTML = n.sanitize(
        a,
        (l = d[s]) != null ? l : f
      );
      return;
    }
    e.innerHTML = n.sanitize(
      a,
      f
    );
  };
  return v ? {
    mounted: t,
    updated: t
  } : {
    inserted: t,
    update: t,
    unbind: (e) => {
      e.innerHTML = "";
    }
  };
}
const h = {
  install(o, r = {}, n = m) {
    o.directive(
      "dompurify-html",
      k(r, n)
    );
  }
};
export {
  k as buildVueDompurifyHTMLDirective,
  h as default,
  h as vueDompurifyHTMLPlugin
};
