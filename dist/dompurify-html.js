"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDirective = void 0;
var dompurify_1 = require("dompurify");
function setUpHooks(config) {
    var hooks = config.hooks;
    var hookName;
    for (hookName in hooks) {
        dompurify_1.addHook(hookName, hooks[hookName]);
    }
}
function buildDirective(config) {
    if (config === void 0) { config = {}; }
    setUpHooks(config);
    var updateComponent = function (el, binding) {
        if (binding.oldValue === binding.value) {
            return;
        }
        var arg = binding.arg;
        var namedConfigurations = config.namedConfigurations;
        if (namedConfigurations &&
            typeof namedConfigurations[arg] !== 'undefined') {
            el.innerHTML = dompurify_1.sanitize(binding.value, namedConfigurations[arg]);
            return;
        }
        el.innerHTML = dompurify_1.sanitize(binding.value, config.default);
    };
    return {
        inserted: updateComponent,
        update: updateComponent,
    };
}
exports.buildDirective = buildDirective;
