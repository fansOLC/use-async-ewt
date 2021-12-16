declare const useAsync: (asyncFunction: any, immediate?: boolean) => {
    execute: () => any;
    loading: boolean;
    data: any;
    error: any;
};
export default useAsync;
