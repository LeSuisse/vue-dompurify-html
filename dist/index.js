"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_html_1 = require("./dompurify-html");
exports.default = {
    install: function (app, config) {
        if (config === void 0) { config = {}; }
        app.directive('dompurify-html', dompurify_html_1.buildDirective(config));
    },
};
