import l from "dompurify";
function m(t, i) {
  const n = t.hooks ?? {};
  let e;
  for (e in n) {
    const r = n[e];
    r !== void 0 && i.addHook(e, r);
  }
}
function f() {
  return l();
}
function p(t = {}, i = f) {
  const n = i();
  m(t, n);
  const e = function(o) {
    const s = o.value;
    if (o.oldValue === s)
      return;
    const u = `${s}`, a = o.arg, d = t.namedConfigurations, c = t.default ?? {};
    return d && a !== void 0 ? n.sanitize(
      u,
      d[a] ?? c
    ) : n.sanitize(u, c);
  }, r = function(o, s) {
    const u = e(s);
    u !== void 0 && (o.innerHTML = u);
  };
  return {
    mounted: r,
    updated: r,
    getSSRProps(o) {
      return {
        innerHTML: e(o)
      };
    }
  };
}
const k = {
  install(t, i = {}, n = f) {
    t.directive(
      "dompurify-html",
      p(i, n)
    );
  }
};
export {
  p as buildVueDompurifyHTMLDirective,
  k as default,
  k as vueDompurifyHTMLPlugin
};
