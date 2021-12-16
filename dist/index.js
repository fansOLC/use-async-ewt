"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsync = exports.httpConfig = exports.http = void 0;
/*
 * @Author: fansolc
 * @Date: 2021-12-15 11:45:11
 * @LastEditors: fansolc
 * @LastEditTime: 2021-12-16 16:17:28
 * @Description: 入口文件
 */
const config_1 = require("./http/config");
Object.defineProperty(exports, "http", { enumerable: true, get: function () { return config_1.http; } });
Object.defineProperty(exports, "httpConfig", { enumerable: true, get: function () { return config_1.httpConfig; } });
const useAsync_1 = __importDefault(require("./http/useAsync"));
exports.useAsync = useAsync_1.default;
