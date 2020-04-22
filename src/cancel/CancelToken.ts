import { CancelExecutor, CancelTokenSource, Canceler } from '../types'

interface ResolvePromise {
  (resson?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      // 目的是把resolve函数暴露出去，包一层函数来传reason
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler // 不断言下面会报错，ts检测不到声明是什么鬼
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
