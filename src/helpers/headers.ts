import { isPlainObject } from './util'
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
