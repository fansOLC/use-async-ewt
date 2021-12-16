"use strict";
/*
 * @Author: fansolc
 * @Date: 2021-11-18 18:52:19
 * @LastEditors: fansolc
 * @LastEditTime: 2021-12-16 10:51:43
 * @Description: 异步请求封装
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useAsync = (asyncFunction, immediate = false) => {
    // 设置三个异步逻辑相关的 state
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    // 定义一个 callback 用于执行异步逻辑
    const execute = (0, react_1.useCallback)(() => {
        // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
        setLoading(true);
        setData(null);
        setError(null);
        return asyncFunction()
            .then((response) => {
            // 请求成功时，将数据写进 state，设置 loading 为 false
            setData(response);
            setLoading(false);
        })
            .catch((error) => {
            // 请求失败时，设置 loading 为 false，并设置错误状态
            setError(error);
            setLoading(false);
        });
    }, [asyncFunction]);
    (0, react_1.useEffect)(() => {
        if (immediate) {
            execute();
        }
    }, []);
    return { execute, loading, data, error };
};
exports.default = useAsync;
