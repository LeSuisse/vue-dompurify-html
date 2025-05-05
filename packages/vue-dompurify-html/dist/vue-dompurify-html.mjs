import p from "dompurify";
function m(t, i) {
  const n = t.hooks ?? {};
  let e;
  for (e in n) {
    const r = n[e];
    r !== void 0 && i.addHook(e, r);
  }
}
function l() {
  return p();
}
function v(t = {}, i = l) {
  const n = i();
  m(t, n);
  const e = function(o) {
    const s = o.value;
    if (o.oldValue === s)
      return;
    const u = `${s}`, d = o.arg, c = t.namedConfigurations, f = t.default ?? {};
    return c && d !== void 0 ? n.sanitize(
      u,
      c[d] ?? f
    ) : n.sanitize(u, f);
  }, r = function(o, s) {
    const u = e(s);
    u !== void 0 && (o.innerHTML = u);
  }, a = {
    mounted: r,
    updated: r
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
  install(t, i = {}, n = l) {
    t.directive(
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
