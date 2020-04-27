const cookie = {
  read(name: string): string | null {
    // 传入name读取对应的cookie值
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
