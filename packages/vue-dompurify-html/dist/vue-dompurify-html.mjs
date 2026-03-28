import e from "dompurify";
//#region src/dompurify-html.ts
function t(e, t) {
	let n = e.hooks ?? {}, r;
	for (r in n) {
		let e = n[r];
		t.addHook(r, e);
	}
}
function n() {
	return e();
}
function r(e = {}, r = n) {
	let i = r();
	t(e, i);
	let a = function(t) {
		let n = t.value;
		if (t.oldValue === n) return;
		let r = `${n}`, a = t.arg?.toString(), o = e.namedConfigurations, s = e.default ?? {};
		return o && a ? i.sanitize(r, o[a] ?? s) : i.sanitize(r, s);
	}, o = function(e, t) {
		let n = a(t);
		n !== void 0 && (e.innerHTML = n);
	}, s = {
		mounted: o,
		updated: o
	};
	return e.enableSSRPropsSupport ? {
		...s,
		getSSRProps(e) {
			return { innerHTML: a(e) };
		}
	} : s;
}
//#endregion
//#region src/index.ts
var i = { install(e, t = {}, i = n) {
	e.directive("dompurify-html", r(t, i));
} };
//#endregion
export { r as buildVueDompurifyHTMLDirective, i as default, i as vueDompurifyHTMLPlugin };
