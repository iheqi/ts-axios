export default class Cancel {
  // types中定义了Cancel接口，这里又不继承，是什么意思
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
