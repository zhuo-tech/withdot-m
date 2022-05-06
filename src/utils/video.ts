const videoHttp: string = 'https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com/file'

/**
 * 视频地址拼接
 * @param {string} url
 * @returns {string}
 */
export function videoAddress(url: string): string {
    console.log(url)
    return !!url ? videoHttp + url : ''
}

