import { CoreDot } from '@/model/entity/CoreDot'

export function dotStyle(data: CoreDot) {
    if (data.type === 'IMAGE') {
        return {
            left: Number(data.position.x * 100).toFixed(0) + '%',
            top: Number(data.position.y * 100).toFixed(0) + '%',
            width: Number(data.position.width as number * 100).toFixed(0) + '%',
            height: Number(data.position.width as number * 100).toFixed(0) + '%',
        }
    } else {
        return {
            left: Number(data.position.x * 100).toFixed(0) + '%',
            top: Number(data.position.y * 100).toFixed(0) + '%',
            width: Number(data.position.width as number * 200).toFixed(0) + '%',
            height: Number(data.position.width as number * 200).toFixed(0) + '%',
        }
    }
}

