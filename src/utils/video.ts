const videoHttp: string = 'https://oss.lafyun.com/7dd2f8e8-6102-492c-a522-b5a7db2ab00a'

/**
 * 视频地址拼接
 * @param {string} url
 * @returns {string}
 */
export function videoAddress(url: string): string {
    if (!url) {
        return ''
    }

    return videoHttp + '-' + url.slice(1)
}

