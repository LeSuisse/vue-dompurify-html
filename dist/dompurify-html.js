"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDirective = void 0;
var dompurify = require("dompurify");
function setUpHooks(config, dompurifyInstance) {
    var hooks = config.hooks;
    var hookName;
    for (hookName in hooks) {
        dompurifyInstance.addHook(hookName, hooks[hookName]);
    }
}
function buildDirective(config) {
    if (config === void 0) { config = {}; }
    var dompurifyInstance = dompurify();
    setUpHooks(config, dompurifyInstance);
    var updateComponent = function (el, binding) {
        var arg = binding.arg;
        var namedConfigurations = config.namedConfigurations;
        if (namedConfigurations &&
            typeof namedConfigurations[arg] !== 'undefined') {
            el.innerHTML = dompurifyInstance.sanitize(binding.value, namedConfigurations[arg]);
            return;
        }
        el.innerHTML = dompurifyInstance.sanitize(binding.value, config.default);
    };
    return {
        mounted: updateComponent,
        updated: updateComponent,
    };
}
exports.buildDirective = buildDirective;
