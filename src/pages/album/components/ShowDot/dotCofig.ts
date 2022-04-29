import { CoreDot } from '@/model/entity/CoreDot'

type EmitsType = {
    (event: 'videoStop'): void,
    (event: 'videoPlay'): void
}

export function dotCogig(data: CoreDot, emits: EmitsType) {
    const {pause, time, switch: stopTime} = data.config
    pause ? emits('videoStop') : null
    if (stopTime) {
        time ? emits('videoPlay') : null
    }
}

