interface SingleApi {
    method: string;
    url: string;
    mockUrl?: string;
    type?: string;
}
interface API {
    [key: string]: {
        [key: string]: SingleApi;
    };
}
declare type UnknownObj = {
    [key: string]: any;
};
interface HttpFunc {
    [key: string]: (params?: UnknownObj, isFormData?: boolean, config?: UnknownObj) => Promise<any>;
}
declare const http: HttpFunc;
declare function httpConfig(api: API, reqConfig: any, resConfig: any, resErrorConfig: any, envName: string, mockEnvName: string): void;
export { http, httpConfig };
