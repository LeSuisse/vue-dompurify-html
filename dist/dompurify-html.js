"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDirective = void 0;
var dompurify_1 = require("dompurify");
function buildDirective(config) {
    if (config === void 0) { config = {}; }
    var updateComponent = function (el, binding) {
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
        mounted: updateComponent,
        updated: updateComponent,
    };
}
exports.buildDirective = buildDirective;
