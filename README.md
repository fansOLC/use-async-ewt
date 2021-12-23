# use-async-ewt
基于axios封装异步请求

## 1、安装
```
  yarn: yarn add use-async-ewt
  npm: npm install use-async-ewt --save
```

## 2、httpConfig、http使用
### 2.1 在项目入口处导入，并初始化
index.tsx:
```
import { httpConfig } from 'use-async-ewt'

// 初始化配置
httpConfig(apis, reqRequest, resConfig, resErrorConfig, currentEnvName, mockEnvName)
```

### 2.2 参数说明
```
apis：
{
  [key: string]: {
    [key: string]: {
      method: string,
      url: string,
      mockUrl?: string,
      type?: string
    }
  }
}
reqRequest: 请求拦截器回调
resConfig: 响应拦截回调
resErrorConfig: 响应错误回调
currentEnvName: string // 当前项目环境变量名称
mockEnvName: string // mock环境名称
```

### 2.3 示例
```
import { httpConfig } from 'use-async-ewt'
import apis from './apis.ts'

// 请求拦截器回调
const reqRequest = function (config) {
  ...
  ...
  return config
}

// 响应拦截回调
const resConfig = function (response) {
  ...
  ...
  return response
}

// 响应错误回调
const resErrorConfig = function(error) {
  ...
  ...
  return Promise.reject(error)
}

httpConfig(apis, reqRequest, resConfig, resErrorConfig, 'REACT_APP_ENV', 'mock')
```

apis.ts:
```
import demo1 from 'demo1.ts'
export default {
  demo1,
}
```

demo1.ts:
```
export default {
  getUserInfo: { // 获取用户信息
    method: 'get',
    url: `${url}/api/getUserInfo`,
    mockUrl: 'http://mockUrl.com'
  },
  ...
}
```

### 2.4 组件中使用
```
import { http } from 'use-async-ewt'

const getUserInfo = async () => {
  const { data } = await http.getUserInfo(params)
  ...
}

```

## 3. useAsync

### 3.1 使用说明
```
const {data, loading, error, excute} = useAsync(()=>Promise<any>, boolean)
```

### 3.2 参数说明
```
useAsync(返回promise的函数， 是否立即执行) // 默认false不立即执行
data: 请求获取的数据
loading: loading状态
error: 请求错误的error
excute: 调用该请求函数的方法
```
### 3.3 使用示例
```
import { useAsync, http } from 'use-async-ewt'

const { execute, data, loading} = useAsync(()=> http.getUserInfo(params), true)
if(loading) {
  return <Loading />
}
return <h1>{ data.useName }</h1>
```