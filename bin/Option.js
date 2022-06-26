"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionInitializer = exports.OptionDefault = void 0;
var path = require("path");
/**
 * Optionのデフォルト値
 */
var OptionDefault = /** @class */ (function () {
    function OptionDefault() {
    }
    OptionDefault.stagingDir = "staging";
    OptionDefault.exclude = [
        ".git/**",
        ".gitignore",
        "node_modules/**",
        "**/*/.DS_Store",
        "**/*/rev-manifest.json",
    ];
    return OptionDefault;
}());
exports.OptionDefault = OptionDefault;
var OptionInitializer = /** @class */ (function () {
    function OptionInitializer() {
    }
    OptionInitializer.init = function (option) {
        var _a, _b, _c;
        option.root = (_a = option.root) !== null && _a !== void 0 ? _a : "dist";
        option.root = path.resolve(process.cwd(), option.root);
        option.stagingDir = (_b = option.stagingDir) !== null && _b !== void 0 ? _b : OptionDefault.stagingDir;
        option.exclude = (_c = option.exclude) !== null && _c !== void 0 ? _c : OptionDefault.exclude;
        return option;
    };
    OptionInitializer.getStagingOption = function (option) {
        var auth = this.getAuth(option);
        return __assign(__assign({}, auth), { localRoot: option.root, remoteRoot: path.posix.join(auth.remoteRoot, option.stagingDir), include: ["*"], exclude: __spreadArray(__spreadArray([], option.exclude, true), [".htaccess"], false), forcePasv: true });
    };
    OptionInitializer.getDeployOption = function (option) {
        var auth = this.getAuth(option);
        return __assign(__assign({}, auth), { localRoot: option.root, include: ["*"], exclude: option.exclude, forcePasv: true });
    };
    OptionInitializer.getAuth = function (option) {
        var auth = require(option.authFilePath);
        if (auth.user == null) {
            console.warn("FTPユーザーが設定されていません");
            return null;
        }
        if (auth.password == null) {
            console.warn("FTPパスワードが設定されていません");
            return null;
        }
        if (auth.host == null) {
            console.warn("FTPホストが設定されていません");
            return null;
        }
        if (auth.remoteRoot == null) {
            console.warn("リモートルートパスが設定されていません");
            return null;
        }
        return auth;
    };
    return OptionInitializer;
}());
exports.OptionInitializer = OptionInitializer;
//# sourceMappingURL=Option.js.map