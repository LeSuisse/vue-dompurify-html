import dompurify from "dompurify";
function setUpHooks(config, dompurifyInstance) {
  var _a;
  const hooks = (_a = config.hooks) != null ? _a : {};
  let hookName;
  for (hookName in hooks) {
    const hook = hooks[hookName];
    if (hook !== void 0) {
      dompurifyInstance.addHook(hookName, hook);
    }
  }
}
function buildDirective(config = {}) {
  const dompurifyInstance = dompurify();
  setUpHooks(config, dompurifyInstance);
  const updateComponent = function(el, binding) {
    var _a, _b;
    const arg = binding.arg;
    const namedConfigurations = config.namedConfigurations;
    const defaultConfig = (_a = config.default) != null ? _a : {};
    if (namedConfigurations && arg !== void 0) {
      el.innerHTML = dompurifyInstance.sanitize(binding.value, (_b = namedConfigurations[arg]) != null ? _b : defaultConfig);
      return;
    }
    el.innerHTML = dompurifyInstance.sanitize(binding.value, defaultConfig);
  };
  return {
    mounted: updateComponent,
    updated: updateComponent
  };
}
const vueDompurifyHTMLPlugin = {
  install(app, config = {}) {
    app.directive("dompurify-html", buildDirective(config));
  }
};
export { buildDirective as buildVueDompurifyHTMLDirective, vueDompurifyHTMLPlugin as default, vueDompurifyHTMLPlugin };
