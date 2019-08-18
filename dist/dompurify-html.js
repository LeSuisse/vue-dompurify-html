"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_1 = require("dompurify");
function buildDirective(config) {
    if (config === void 0) { config = {}; }
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
        unbind: function (el) {
            el.innerHTML = '';
        }
    };
}
exports.buildDirective = buildDirective;
