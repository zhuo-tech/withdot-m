import { getOrderListApi } from '@/api/order/orderApi'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { getUserInfo } from '@/utils/token'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'

const {_id} = getUserInfo()

export function orderFormService() {
    //订单数据
    const orderList = ref<PayGoodsOrder[]>()

    const getOrderList = (id: string) => {
        if (!id) {
            Notify('您还没有登录,请先登录')
            return
        }
        getOrderListApi(id).then(response => {
            orderList.value = response
        }).catch(err => {
            Notify(err.toString())
        })
    }
    onLoad(() => {
        getOrderList(_id)
    })

    const toDetail = (id: string) => {
        uni.navigateTo({
            url: `/pages/my/orderForm/orderFormDetail?id=${ id }`,
        })
    }
    return {
        toDetail,
        orderList,
    }
}
