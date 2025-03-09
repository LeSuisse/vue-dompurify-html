import l from "dompurify";
function m(t, o) {
  const n = t.hooks ?? {};
  let e;
  for (e in n) {
    const u = n[e];
    u !== void 0 && o.addHook(e, u);
  }
}
function c() {
  return l();
}
function p(t = {}, o = c) {
  const n = o();
  m(t, n);
  const e = function(u, i) {
    const r = i.value;
    if (i.oldValue === r)
      return;
    const a = `${r}`, s = i.arg, d = t.namedConfigurations, f = t.default ?? {};
    if (d && s !== void 0) {
      u.innerHTML = n.sanitize(
        a,
        d[s] ?? f
      );
      return;
    }
    u.innerHTML = n.sanitize(
      a,
      f
    );
  };
  return {
    mounted: e,
    updated: e
  };
}
const k = {
  install(t, o = {}, n = c) {
    t.directive(
      "dompurify-html",
      p(o, n)
    );
  }
};
export {
  p as buildVueDompurifyHTMLDirective,
  k as default,
  k as vueDompurifyHTMLPlugin
};
