import { cloud } from '@/config/cloud'
import { CoreAlbumWork } from '@/model/entity/CoreAlbum'
import { CoreDot } from '@/model/entity/CoreDot'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { HisVodRecord } from '@/model/HisVodRecord'
import { getUserInfo } from '@/utils/token'

const DB = cloud.database()

export type VideoDataType = CoreWork
    & Pick<CoreAlbumWork, 'isFree' | 'trialTime'>
    & {
    materialData: CoreMaterial,
    dotData: Array<CoreDot>
}

/**
 * 根据作品_id 查询作品素材视频 打点数据
 * @param {string} workId  作品_id
 * @param albumId  专辑_id
 */
export function getVideoData(workId: string, albumId: string): Promise<VideoDataType> {
    return cloud.invokeFunction<VideoDataType>('app-video-data', {workId, albumId})
}

/**
 * 添加更新浏览视频长度
 * @param {number} createTime 浏览时长
 * @param {string} albumId 专辑-id
 * @param {string} workId 作品_id
 * @returns {Promise<void>}
 */
export async function hisVodApi(createTime: number, albumId: string, workId: string) {
    try {
        const has = await isHas()
        if (has) {
            await updataHis()
        } else {
            await addHis()
        }
    } catch (err) {
        console.log(err)
    }

    async function isHas() {
        const res = await DB.collection(HisVodRecord.TABLE_NAME)
            .where({
                userId: getUserInfo()._id,
                albumId,
                workId,
            })
            .count()
        if (!res.ok) {
            throw new Error(res.error)
        }
        return res.total >= 1
    }

    async function addHis() {
        const res = await DB.collection(HisVodRecord.TABLE_NAME)
            .add({
                userId: getUserInfo()._id,
                albumId,
                workId,
                createTime,
            })
        if (!res.ok) {
            throw new Error(res.error)
        }
    }

    async function updataHis() {
        const res = await DB.collection(HisVodRecord.TABLE_NAME)
            .where({
                userId: getUserInfo()._id,
                albumId,
                workId,
            })
            .update({
                createTime,
            })
        if (!res.ok) {
            throw new Error(res.error)
        }
    }
}
