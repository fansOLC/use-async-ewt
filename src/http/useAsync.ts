/*
 * @Author: fansolc
 * @Date: 2021-11-18 18:52:19
 * @LastEditors: fansolc
 * @LastEditTime: 2021-12-16 10:51:43
 * @Description: 异步请求封装
 */

import { useState, useCallback, useEffect } from 'react'


const useAsync = (asyncFunction: any, immediate: boolean = false) => {
  // 设置三个异步逻辑相关的 state
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  // 定义一个 callback 用于执行异步逻辑
  const execute = useCallback(() => {
    // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
    setLoading(true)
    setData(null)
    setError(null)
    return asyncFunction()
      .then((response: any) => {
        // 请求成功时，将数据写进 state，设置 loading 为 false
        setData(response)
        setLoading(false)
      })
      .catch((error) => {
        // 请求失败时，设置 loading 为 false，并设置错误状态
        setError(error)
        setLoading(false)
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [])

  return { execute, loading, data, error }
}

export default useAsync