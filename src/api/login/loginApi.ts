import { cloud } from '@/config/cloud'
import { setToken } from '@/utils/token'
import { Notify } from 'vant'

/**
 * 获取短信验证
 * @param mobile:any
 * @returns {Promise<any>}
 */
export async function mobileSendCode(mobile: any) {
    return await cloud.invokeFunction('send-login-sms', {
        phone: mobile,
    })
}

export async function smsLogin(username: any, code: any) {
    return await cloud.invokeFunction('app-quick-login', {username, code}).then(response => {
        if (response !== 0) {
            return
        }
        setToken(response.data.access_token)
    }).catch(err => {
        Notify(err.toString())
    })
}
