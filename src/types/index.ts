export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'option' | 'OPTION'
| 'head' | 'HEAD'
| 'patch' | 'PATCH';

export interface AxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,
  params?: any
}
