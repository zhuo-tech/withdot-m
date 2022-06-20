import { DB } from '@/config/cloud'
import { CoreAlbum, CoreAlbumWork } from '@/model/entity/CoreAlbum'
import { HisVodRecord } from '@/model/entity/Dot/HisVodRecord'
import { LogicDelete } from '@/model/LogicDelete'
import { getUserInfo } from '@/utils/token'

/**
 *
 * @param {string} _id 专辑ID
 * @return {Promise<CoreAlbum>} 专辑信息
 */
export async function getAlbumDetailApi(_id: string): Promise<CoreAlbum> {
    const res = await DB.collection(CoreAlbum.TABLE_NAME)
        .where({
            _id,
            delFlag: LogicDelete.NORMAL,
        })
        .getOne<CoreAlbum>()
    if (!res.ok) {
        throw new Error(res.error)
    }
    res.data.workList = await Promise.all(res.data.workList.map(async (it: CoreAlbumWork) => {
        return {
            ...it,
            viewers: await getWorkViewers(res.data._id, it._id),
            watchHistory: await getUserWatchHistory(res.data._id, it._id as string),
        }
    }))
    return res.data
}

async function getUserWatchHistory(albumId: string, workId: string) {
    const countRes = await DB.collection(HisVodRecord.TABLE_NAME)
        .where({
            albumId,
            workId,
            userId: getUserInfo()._id,
        })
        .count()
    if (!countRes.ok) {
        throw new Error(countRes.error)
    }
    if (countRes.total === 0) {
        return 0
    }
    const res = await DB.collection(HisVodRecord.TABLE_NAME)
        .where({
            albumId,
            workId,
            userId: getUserInfo()._id,
        })
        .getOne<HisVodRecord>()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data.createTime ?? 0
}

async function getWorkViewers(albumId: string, workId: string) {
    const res = await DB.collection(HisVodRecord.TABLE_NAME)
        .where({albumId, workId})
        .get()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data?.length
}