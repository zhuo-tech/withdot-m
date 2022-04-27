import { CoreDot } from '@/model/entity/CoreDot'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { cloud } from '@/config/cloud'


export type VideoDataType = CoreWork & { dotData: CoreDot, materialData: CoreMaterial }

export function VideoFun() {

    /**
     * 根据作品_id 查询作品素材视频 打点数据
     * @param {string} workId  作品_id
     * @returns {Promise<CoreWork[]>}
     */
    const getVideoFun = async (workId: string = '6253b86129ef3d8dd5669c79') => {
        return await cloud.invokeFunction('app-video-data', {workId})
    }

    return {
        getVideoFun,
    }
}
