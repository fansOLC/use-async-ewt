declare type UnknownObj = {
    [key: string]: any;
};
interface HttpFunc {
    [key: string]: (params?: UnknownObj, isFormData?: boolean, config?: UnknownObj) => Promise<any>;
}
declare const http: HttpFunc;
declare function httpConfig(api: {} | undefined, reqConfig: any, resConfig: any, resErrorConfig: any, envName: any, mockEnvName: any): void;
export { http, httpConfig };
