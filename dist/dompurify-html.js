"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_1 = require("dompurify");
function buildDirective(config) {
    if (config === void 0) { config = {}; }
    return {
        bind: function (el, binding) {
            var arg = binding.arg;
            if (arg in config) {
                el.innerHTML = dompurify_1.sanitize(binding.value, config[arg]);
                return;
            }
            el.innerHTML = dompurify_1.sanitize(binding.value);
        }
    };
}
exports.buildDirective = buildDirective;
