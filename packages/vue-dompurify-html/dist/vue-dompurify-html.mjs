import l from "dompurify";
function m(t, i) {
  const n = t.hooks ?? {};
  let o;
  for (o in n) {
    const u = n[o];
    u !== void 0 && i.addHook(o, u);
  }
}
function c() {
  return l();
}
function p(t = {}, i = c) {
  const n = i();
  m(t, n);
  const o = function(e) {
    const s = e.value;
    if (e.oldValue === s)
      return;
    const r = `${s}`, a = e.arg, d = t.namedConfigurations, f = t.default ?? {};
    return d && a !== void 0 ? n.sanitize(
      r,
      d[a] ?? f
    ) : n.sanitize(r, f);
  }, u = function(e, s) {
    const r = o(s);
    r !== void 0 && (e.innerHTML = r);
  };
  return {
    mounted: u,
    updated: u,
    getSSRProps(e) {
      return {
        innerHTML: o(e)
      };
    }
  };
}
const k = {
  install(t, i = {}, n = c) {
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
