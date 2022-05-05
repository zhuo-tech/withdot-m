import orderImg from '@/static/my/orderForm.png'
import purchasedImg from '@/static/my/purchased.png'
import { whetherToLogIn } from '@/utils/token'
import { ref } from 'vue'

export function indexService() {
    const tabsData = ref([
        {imgUrl: orderImg, name: '我的订单', toPath: '/pages/my/orderForm/index'},
        {imgUrl: purchasedImg, name: '已购专辑', toPath: '/pages/my/album/index'},
    ])

    const toPath = (path: string) => {
        whetherToLogIn(path)
    }

    return {
        tabsData,
        toPath,
    }
}
