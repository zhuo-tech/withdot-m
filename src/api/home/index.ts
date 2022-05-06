import { DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { LogicDelete } from '@/model/LogicDelete'

export async function getAlbumListApi(pages: any, search?: any) {
    console.log(pages, '页')
    console.log(search, '搜索')
    const whereFlag = {
        delFlag: LogicDelete.NORMAL,
    }
    if (search) {
        whereFlag['title'] = new RegExp(`.*${search}.*`)
    }
    const countRes = await DB.collection(CoreAlbum.TABLE_NAME)
        .where(whereFlag)
        .count()
    if (!countRes.ok) {
        throw new Error(countRes.error)
    }
    const albumRes = await DB.collection(CoreAlbum.TABLE_NAME)
        .where(whereFlag)
        .page({
            current: pages.current,
            size: pages.size,
        })
        .orderBy('updateTime', 'desc')
        .get<CoreAlbum>()
    if (!albumRes.ok) {
        throw new Error(albumRes.error)
    }
    return {
        ...albumRes,
        total: countRes.total,
    }
}
