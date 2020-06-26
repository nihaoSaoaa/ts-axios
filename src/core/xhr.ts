import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'GET', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)

    if (responseType) request.responseType = responseType
    if (timeout) request.timeout = timeout

    // 处理响应
    request.onreadystatechange = function handleLoad(): void {
      if (request.readyState !== 4) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = request.responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    // 网络错误
    request.onerror = function handleError(): void {
      reject(reject(createError(`NetWork Error`, config, null, request)))
    }
    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    Object.keys(headers).forEach(name => {
      // data 为空时不需要 content-type 字段
      if (data === null && name.toUpperCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(res: AxiosResponse) {
      if (res.status >= 200 && res.status < 300) resolve(res)
      else {
        return createError(`Request failed with status code ${status}`, config, null, request, res)
      }
    }
  })
}
