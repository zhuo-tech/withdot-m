import { DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { LogicDelete } from '@/model/LogicDelete'

export async function getOrderListApi(id: string) {
    const res = await DB.collection(PayGoodsOrder.TABLE_NAME)
        .where({
            userId: id,
            delFlag: LogicDelete.NORMAL,
        })
        .withOne({
            query: DB.collection(CoreAlbum.TABLE_NAME)
                .field({
                    _id: 1,
                    title: 1,
                    coverHref: 1,
                }),
            localField: 'goodsId',
            foreignField: '_id',
            as: 'album',
        })
        .get<PayGoodsOrder>()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data
}

export async function getOrderDetailApi(id: string) {
    const res = await DB.collection(PayGoodsOrder.TABLE_NAME)
        .where({
            _id: id,
            delFlag: LogicDelete.NORMAL,
        })
        .withOne({
            query: DB.collection(CoreAlbum.TABLE_NAME)
                .field({
                    _id: 1,
                    title: 1,
                    coverHref: 1,
                }),
            localField: 'goodsId',
            foreignField: '_id',
            as: 'album',
        })
        .getOne<PayGoodsOrder>()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data
}

export async function purchasedAlbumListApi(id: string) {
    const res = await DB.collection(PayGoodsOrder.TABLE_NAME)
        .where({
            userId: id,
            delFlag: LogicDelete.NORMAL,
            status: '2',
        })
        .withOne({
            query: DB.collection(CoreAlbum.TABLE_NAME)
                .field({
                    _id: 1,
                    title: 1,
                    coverHref: 1,
                }),
            localField: 'goodsId',
            foreignField: '_id',
            as: 'album',
        })
        .get<PayGoodsOrder>()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.data
}
