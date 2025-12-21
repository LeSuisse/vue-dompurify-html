import p from "dompurify";
function m(t, r) {
  const n = t.hooks ?? {};
  let e;
  for (e in n) {
    const i = n[e];
    i !== void 0 && r.addHook(e, i);
  }
}
function f() {
  return p();
}
function v(t = {}, r = f) {
  const n = r();
  m(t, n);
  const e = function(o) {
    const s = o.value;
    if (o.oldValue === s)
      return;
    const u = `${s}`, l = o.arg, c = t.namedConfigurations, d = t.default ?? {};
    return c ? n.sanitize(
      u,
      c[l] ?? d
    ) : n.sanitize(u, d);
  }, i = function(o, s) {
    const u = e(s);
    u !== void 0 && (o.innerHTML = u);
  }, a = {
    mounted: i,
    updated: i
  };
  return t.enableSSRPropsSupport ? {
    ...a,
    getSSRProps(o) {
      return {
        innerHTML: e(o)
      };
    }
  } : a;
}
const y = {
  install(t, r = {}, n = f) {
    t.directive(
      "dompurify-html",
      v(r, n)
    );
  }
};
export {
  v as buildVueDompurifyHTMLDirective,
  y as default,
  y as vueDompurifyHTMLPlugin
};
