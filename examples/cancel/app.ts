import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  setTimeout(() => {
    axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) { // 这个token与get的是同一个，前面已经被取消，所以不会发送出去
      if (axios.isCancel(e)) {
        console.log(e.message)
      }
    })
  }, 100)
}, 100)


// 第二种方式
let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => { // 服务设置超时1000，这里1500后才取消，请求已经返回。
  cancel()
}, 1500)
