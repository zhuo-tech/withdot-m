import { DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { LogicDelete } from '@/model/LogicDelete'

/**
 * 通过专辑的_id查找专辑详情 其中包含 作品的数组
 * @param {string} albumId
 * @returns {Promise<any>}
 */
export async function getAlbumWorklApi(albumId: string) {
    const res = await DB.collection(CoreAlbum.TABLE_NAME)
        .where({
            _id:albumId,
            delFlag: LogicDelete.NORMAL,
        })
        .getOne()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data
}
