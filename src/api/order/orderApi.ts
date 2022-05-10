import { getAlbumDetailApi } from '@/api/album/album'
import { cloud, DB } from '@/config/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { LogicDelete } from '@/model/LogicDelete'
import { Notify } from 'vant'

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

/**
 * 判断专辑是否支付 如果专辑价格为0 表示免费 可以直接跳转进专辑页面
 * @param {string} userId 用户id
 * @param {string} goodsId 专辑id
 * @returns {Promise<boolean>}
 */
export async function determineWhetherToPay(userId: string, goodsId: string): Promise<Boolean> {
    const priceRes: CoreAlbum = await getAlbumDetailApi(goodsId)
    if (!priceRes.sellingPrice || priceRes.sellingPrice === '0' || priceRes.sellingPrice === undefined) {
        return true
    }
    console.log(4444444444444444444444444)
    const res = await DB.collection(PayGoodsOrder.TABLE_NAME)
        .where({
            userId,
            goodsId,
            delFlag: LogicDelete.NORMAL,
        })
        .count()
    if (!res.ok) {
        throw new Error(res.error)
    }
    return res.total >= 1
}

export async function payApi(goodsName: string, totalFee: number, tradeType: string, goodsId: string) {
    const res = await cloud.invokeFunction('wx-unified-order', {goodsName, totalFee, tradeType, goodsId})
    if (res.error_code === '1') {
        throw new Error(res.error_msg)
    }
    return res
}
