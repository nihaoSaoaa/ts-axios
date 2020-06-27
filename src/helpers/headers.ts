import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

function normalizeHeaderName(headers: any, headerName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== headerName && name.toUpperCase() === headerName.toUpperCase()) {
      headers[headerName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 解析请求头字符串
 * @param headersStr 字符串
 */
export function parseHeaders(headersStr: string): any {
  let parsed = Object.create(null)
  if (!headersStr) return parsed
  return headersStr.split('\r\n').reduce((parsed, header) => {
    let [name, value] = header.split(':')
    name = name.trim().toLowerCase()
    if (!name) return parsed
    if (value) value = value.trim()
    parsed[name] = value
    return parsed
  }, parsed)
}

/**
 * 展开请求头（将深层次的字段扁平化）
 * @param headers
 * @param method
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
