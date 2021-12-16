"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: fansolc
 * @Date: 2021-12-15 18:08:36
 * @LastEditors: fansolc
 * @LastEditTime: 2021-12-15 18:59:17
 * @Description:
 */
function checkModule(obj) {
    const apiObj = {};
    let moduleName;
    for (moduleName in obj) {
        let key;
        for (key in obj[moduleName]) {
            if (!apiObj[key]) {
                apiObj[key] = obj[moduleName][key];
            }
            else {
                throw new Error(`接口名称有重复，请修改【${key}】`);
            }
        }
    }
    return apiObj;
}
exports.default = checkModule;
