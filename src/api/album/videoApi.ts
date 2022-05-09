import { CoreAlbum, CoreAlbumWork } from '@/model/entity/CoreAlbum'
import { CoreDot } from '@/model/entity/CoreDot'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { cloud } from '@/config/cloud'

export type VideoDataType = CoreWork & { dotData: CoreDot, materialData: CoreMaterial } & CoreAlbumWork

export function VideoFun() {

    /**
     * 根据作品_id 查询作品素材视频 打点数据
     * @param {string} workId  作品_id
     * @param albumId  专辑_id
     * @returns {Promise<CoreWork[]>}
     */
    const getVideoFun = async (workId: string, albumId: string) => {
        return await cloud.invokeFunction('app-video-data', {workId, albumId})
    }

    return {
        getVideoFun,
    }
}
