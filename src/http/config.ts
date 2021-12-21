/*
 * @Author: fansolc
 * @Date: 2020-07-22 10:18:25
 * @LastEditors: fansolc
 * @LastEditTime: 2021-12-21 17:12:16
 * @Description:
 */

import axios from 'axios'
// import api from './api'

interface SingleApi {
  method: string,
  url: string,
  mockUrl?: string,
  type?: string
}

interface API  {
  [key: string]: SingleApi
}

type UnknownObj = {
  [key: string]: any
}

interface HttpFunc  {
  [key: string]: (params?: UnknownObj, isFormData?: boolean, config?: UnknownObj) => Promise<any>
}

// let http: any = null
const http: HttpFunc = {} // 包裹请求方法的容器

const instance = axios.create({
  // baseURL: "/api",
  timeout: 1000 * 60,
})

//restful路径参数替换
const toRest = (url: string, params: UnknownObj) => {
  const reg = new RegExp('\\{(.+?)\\}', 'gi')
  const paramArr = url.match(reg)
  if (!paramArr) return ''
  paramArr.forEach(el => {
    const key = el.substring(1, el.length - 1)
    url = url.replace(el, params[key])
  })
  return url
}

function checkRepeatModule(obj: API): API {
  const apiObj = {};
  let key: string
  for(key in obj) {
    if(!apiObj[key]) {
      apiObj[key] = obj[key]
    } else {
      throw new Error(`接口名称有重复，请修改【${key}】`)
    }
  }
  return apiObj;
}


function httpConfig (api:API, reqConfig, resConfig, resErrorConfig, envName, mockEnvName) {
  
  const service = checkRepeatModule(api)

  // 请求格式/参数的统一
  for (const key in service) {
    // async 作用：避免进入回调地狱
    http[key] = async function (
      params, // 请求参数 get：url; put，post，patch（data）; delete：url
      isFormData = false, // 标识是否是form-data请求
      config = {} // 配置参数
    ) {
      const api = { ...service[key] } // url method
      let newParams: UnknownObj | FormData = {}

      //  content-type是否是form-data的判断
      if (params && isFormData) {
        newParams = new FormData()
        for (const i in params) {
          newParams.append(i, params[i])
        }
      } else {
        if (params) newParams = params
      }
      // 判断是否有restful
      if (api.type === 'restful') {
        api.url = toRest(api.url, newParams)
      }
      // 不同请求的判断
      let response = {} // 请求的返回值
      // 如果当前环境为mock环境使用mockurl
      if (process.env[envName] === mockEnvName) {
        if (api.mockUrl) {
          api.url = api.mockUrl
        } else {
          throw new Error(key + '对象中缺少mockUrl字段！') // TODO:验证
        }
      }
      if (
        api.method === 'put' ||
        api.method === 'post' ||
        api.method === 'patch'
      ) {
        try {
          response = await instance[api.method](api.url, newParams, config)
        } catch (err) {
          response = await Promise.reject(err)
        }
      } else if (api.method === 'delete' || api.method === 'get') {
        if (api.type !== 'restful') {
          config.params = newParams
        }
        try {
          response = await instance[api.method](api.url, config)
        } catch (err) {
          response = await Promise.reject(err)
        }
      }
      return response // 返回响应值
    }
  }

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // return config
      if (reqConfig) {
        return reqConfig(config)
      } else {
        return config
      }
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      if(resConfig) {
        return resConfig(response)
      } else {
        if ((response.data && response.data.success)) {
          return Promise.resolve(response.data)
        } else {
          // message.error(response.data.msg)
          return Promise.reject(response.data || '出错了～')
        }
      }
      // if ((response.data && response.data.success)) {
      //   return Promise.resolve(response.data)
      // } else {
      //   message.error(response.data.msg)
      //   return Promise.reject(response.data || '出错了～')
      // }
    },
    function (error) {
      if(resErrorConfig) {
        return resErrorConfig(error)
      } else {
        return Promise.reject(error)
      }
      // message.error(error?.response?.data?.msg || '服务器端错误')
      // return Promise.reject(error)
    }
  )
  // return Http
}

export {
  http,
  httpConfig
}

