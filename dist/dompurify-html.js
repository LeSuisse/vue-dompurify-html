"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_1 = __importDefault(require("dompurify"));
exports.dompurifyHtmlDirective = {
    bind: function (el, binding) {
        el.innerHTML = dompurify_1.default.sanitize(binding.value);
    }
};
