import { getOrderDetailApi } from '@/api/order/orderApi'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'

export function orderDetailService() {
    let orderDetail = ref<PayGoodsOrder>({} as any)

    const getOrderDetail = (id: string) => {
        getOrderDetailApi(id).then((res) => {
            orderDetail.value = res
        }).catch(err => {
            Notify(err.toString())
        })
    }

    onLoad((router) => {
        const {id} = router
        getOrderDetail(id as string)
    })

    return {
        orderDetail,
    }
}
