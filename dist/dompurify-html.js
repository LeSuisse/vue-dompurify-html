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
        if (arg in config) {
            el.innerHTML = dompurify_1.sanitize(binding.value, config[arg]);
            return;
        }
        el.innerHTML = dompurify_1.sanitize(binding.value);
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
