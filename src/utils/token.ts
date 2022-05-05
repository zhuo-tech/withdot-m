import { Dialog } from 'vant'

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
