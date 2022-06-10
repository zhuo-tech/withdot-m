import { determineWhetherToPay } from '@/api/order/orderApi'
import { Dialog, Notify } from 'vant'

export function setToken(token: any) {
    uni.setStorageSync('token', token)
}

export function getToken() {
    return !!uni.getStorageSync('token')

}

export function whetherToLogIn(path: string) {
    if (getToken()) {
        uni.navigateTo({url: path})
        return
    }
    Dialog.confirm({
            title: '提示',
            message: '您还没有登陆',
        })
        .then(() => uni.navigateTo({url: '/pages/login/index'}))
        .catch(() => {
        })
}

export function setUserInfo(userInfo: any) {
    uni.setStorageSync('user-info', userInfo)
}

export function getUserInfo() {
    if (!getToken()) {
        return
    }
    return uni.getStorageSync('user-info')
}

/**
 * 判断用户是否登录,登录后专辑是否购买
 * @param {string} goodsId 专辑id
 * @param isThereAWork 专辑是否含有作品 true: 含有 false: 不含有
 * @returns {Promise<void>}
 */
export async function judgmentLoginPay(goodsId: string, isThereAWork: Boolean) {
    if (getToken()) {
        if (!isThereAWork) {
            Notify({type: 'primary', message: '该专辑还未添加作品'})
            return
        }
        const whetherPay = await determineWhetherToPay(goodsId)
        if (whetherPay) {
            uni.navigateTo({url: `/pages/album/index?albumId=${ goodsId }`})
            return
        }
        uni.navigateTo({url: `/pages/album/noPayAlbum?albumId=${ goodsId }`})
        return
    }
    Dialog.confirm({
            title: '提示',
            message: '您还没有登陆',
        })
        .then(() => uni.navigateTo({url: '/pages/login/index'}))
        .catch(() => {
        })
}
