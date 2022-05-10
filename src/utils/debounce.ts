export function debounce(callback: any, delay: number): Function {
    let timer: any = null
    return function () {
        if (timer != null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            callback.apply(null, arguments as any)
        }, delay)
    }
}

