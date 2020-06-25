import { type } from 'os'

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'PATCH'
  | 'patch'
  | 'connection'
  | 'CONNECTION'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
}
