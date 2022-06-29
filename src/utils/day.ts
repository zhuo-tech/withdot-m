// @ts-ignore
import dayjs from 'dayjs'

export function filterTime(time: number): string {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}

export function filterWatchHisTory(time: number): string {
    let hh: string
    let mm: string
    let ss: string
    if (time == null || time < 0) {
        return ''
    }
    if (time <= 60) {
        return time + '秒'
    }
    if (time <= 60 * 60) {
        mm = parseInt(String(time / 60)).toString().padStart(2, '0')
        ss = (time - Number(mm) * 60).toString().padStart(2, '0')
        return `${ mm }:${ ss }`
    }
    hh = parseInt(String(time / 60 / 60)).toString().padStart(2, '0')
    mm = parseInt(String(time - Number(hh) * 60 * 60)).toString()
    ss = (time - Number(hh) * 60 * 60 - Number(mm) * 60).toString()
    return `${ hh }:${ mm }:${ ss }`
}

export function getSchedule(workTime: number, watchTime: number) {
    // @ts-ignore
    return (Math.floor(watchTime) / workTime).toFixed(2) * 100 + '%'
}