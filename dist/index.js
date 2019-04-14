"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_html_1 = require("./dompurify-html");
var dompurify_html_2 = require("./dompurify-html");
exports.dompurifyHtmlDirective = dompurify_html_2.dompurifyHtmlDirective;
exports.default = {
    install: function (Vue) {
        Vue.directive('dompurify-html', dompurify_html_1.dompurifyHtmlDirective);
    }
};
