import c from "isomorphic-dompurify";
function f(n, r) {
  const t = n.hooks ?? {};
  let o;
  for (o in t) {
    const e = t[o];
    e !== void 0 && r.addHook(o, e);
  }
}
function d() {
  return c();
}
function a(n, r = {}, t) {
  const o = n.value;
  if (n.oldValue === o)
    return;
  const e = `${o}`, i = n.arg, u = r.namedConfigurations, s = r.default ?? {};
  return u && i !== void 0 ? t.sanitize(
    e,
    u[i] ?? s
  ) : t.sanitize(e, s);
}
function l(n = {}, r = d) {
  const t = r();
  f(n, t);
  const o = function(e, i) {
    const u = a(i, n, t);
    u !== void 0 && (e.innerHTML = u);
  };
  return {
    mounted: o,
    updated: o,
    getSSRProps: (e) => ({
      innerHTML: a(e, n, c)
    })
  };
}
const p = {
  install(n, r = {}, t = d) {
    n.directive(
      "dompurify-html",
      l(r, t)
    );
  }
};
export {
  l as buildVueDompurifyHTMLDirective,
  p as default,
  p as vueDompurifyHTMLPlugin
};
