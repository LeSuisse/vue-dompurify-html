"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVueDompurifyHTMLDirective = void 0;
var dompurify_html_1 = require("./dompurify-html");
var dompurify_html_2 = require("./dompurify-html");
Object.defineProperty(exports, "buildVueDompurifyHTMLDirective", { enumerable: true, get: function () { return dompurify_html_2.buildDirective; } });
exports.default = {
    install: function (Vue, config, buildDOMPurifyInstance) {
        if (config === void 0) { config = {}; }
        if (buildDOMPurifyInstance === void 0) { buildDOMPurifyInstance = dompurify_html_1.defaultDOMPurifyInstanceBuilder; }
        Vue.directive('dompurify-html', (0, dompurify_html_1.buildDirective)(config, buildDOMPurifyInstance));
    },
};
