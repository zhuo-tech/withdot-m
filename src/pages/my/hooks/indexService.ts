import orderImg from '@/static/my/orderForm.png'
import purchasedImg from '@/static/my/purchased.png'
import { whetherToLogIn, getUserInfo } from '@/utils/token'
import { ref } from 'vue'

export function indexService() {
    const tabsData = ref([
        {imgUrl: orderImg, name: '我的订单', toPath: '/pages/my/orderForm/index'},
        {imgUrl: purchasedImg, name: '已购专辑', toPath: '/pages/my/album/index'},
    ])

    const userInfo = ref()

    const toPath = (path: string) => {
        whetherToLogIn(path)
    }

    const toLogin = () => uni.navigateTo({url: '/pages/login/index'})

    const getUserMessage = () => {
        userInfo.value = getUserInfo()
    }

    return {
        userInfo,
        getUserMessage,
        toLogin,
        tabsData,
        toPath,
    }
}
