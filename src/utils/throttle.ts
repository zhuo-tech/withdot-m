export function throttle(func: any, delay: number): Function {
    let run = true
    return function () {
        if (!run) {
            return
        }
        run = false
        const arg = arguments
        setTimeout(() => {
            func.apply(null, arg)
            run = true
        }, delay)
    }
}
