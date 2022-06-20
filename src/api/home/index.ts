import { DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { HisVodRecord } from '@/model/HisVodRecord'
import { LogicDelete } from '@/model/LogicDelete'

type PageType = {
    current: number
    size: number
    total: number
}

type ReturnType = {
    list: Array<CoreAlbum>,
    total: number
}

export async function getAlbumListApi(pages: PageType, search: string): Promise<ReturnType> {
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

    if (countRes.total <= 0) {
        return {list: [], total: 0}
    }

    const albumRes = await DB.collection(CoreAlbum.TABLE_NAME)
        .where(whereFlag)
        .with({
            query: DB.collection(HisVodRecord.TABLE_NAME),
            localField: '_id',
            foreignField: 'albumId',
            as: 'viewers',
        })
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
        list: albumRes.data,
        total: countRes.total,
    }
}
