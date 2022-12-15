import l from "dompurify";
import { isVue3 as m } from "vue-demi";
function p(o, i) {
  const n = o.hooks ?? {};
  let t;
  for (t in n) {
    const e = n[t];
    e !== void 0 && i.addHook(t, e);
  }
}
function c() {
  return l();
}
function v(o = {}, i = c) {
  const n = i();
  p(o, n);
  const t = function(e, r) {
    const u = r.value;
    if (r.oldValue === u)
      return;
    const a = `${u}`, s = r.arg, d = o.namedConfigurations, f = o.default ?? {};
    if (d && s !== void 0) {
      e.innerHTML = n.sanitize(
        a,
        d[s] ?? f
      );
      return;
    }
    e.innerHTML = n.sanitize(
      a,
      f
    );
  };
  return m ? {
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
const y = {
  install(o, i = {}, n = c) {
    o.directive(
      "dompurify-html",
      v(i, n)
    );
  }
};
export {
  v as buildVueDompurifyHTMLDirective,
  y as default,
  y as vueDompurifyHTMLPlugin
};
