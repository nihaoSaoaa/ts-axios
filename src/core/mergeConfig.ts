import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 合并参数2
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}

// 深度合并
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

// 合并策略 map
const strats = Object.create(null)

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
const stratKeysFromDeepMerge = ['headers', 'auth']
stratKeysFromDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * 合并配置
 * @param config1
 * @param config2
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {}
  const config = Object.create(null)
  for (const key in config2) {
    mergeField(key)
  }
  for (const key in config1) {
    if (!config2[key]) mergeField(key)
  }
  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
