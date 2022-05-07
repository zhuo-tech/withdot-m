export function debounce(callback: Function, delay: number) {
    let timer: any = null
    return function () {
        if (timer != null) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            callback.apply(null, arguments as any)
        }, delay)
    }
}

