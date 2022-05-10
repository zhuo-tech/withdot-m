import { DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { LogicDelete } from '@/model/LogicDelete'

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
    return res.data
}
