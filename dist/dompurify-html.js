"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDirective = void 0;
var dompurify_1 = require("dompurify");
function setUpHooks(config) {
    var _a;
    var hooks = (_a = config.hooks) !== null && _a !== void 0 ? _a : {};
    var hookName;
    for (hookName in hooks) {
        var hook = hooks[hookName];
        if (hook !== undefined) {
            (0, dompurify_1.addHook)(hookName, hook);
        }
    }
}
function buildDirective(config) {
    if (config === void 0) { config = {}; }
    setUpHooks(config);
    var updateComponent = function (el, binding) {
        var _a;
        var arg = binding.arg;
        var namedConfigurations = config.namedConfigurations;
        if (namedConfigurations &&
            arg !== undefined &&
            typeof namedConfigurations[arg] !== 'undefined') {
            el.innerHTML = (0, dompurify_1.sanitize)(binding.value, namedConfigurations[arg]);
            return;
        }
        el.innerHTML = (0, dompurify_1.sanitize)(binding.value, (_a = config.default) !== null && _a !== void 0 ? _a : {});
    };
    return {
        inserted: updateComponent,
        update: updateComponent,
    };
}
exports.buildDirective = buildDirective;
