import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// 7.4 函数重载
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello2'
  }
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

// T的传递：getUser =》ResponseData =》axios函数 =》AxiosPromise =》AxiosResponse
// 这样的好处是可以事先定义后响应数据的数据结构
// 处理响应时更好的推断
async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name) // 如这里使用时会有提示（感觉没多大用啊，又不能限制响应数据，如果响应数据更改，则类型和这里都要改）
  }
}

test()
