import { Cloud, EnvironmentType, UniRequest } from 'laf-client-sdk'
import { API_BASE_URL } from '@/config/config'
import { getToken } from '@/utils/index'
import { showError } from '@/utils/show'

/**
 * 自定义请求类，截获请求响应错误
 */
class CloudRequest extends UniRequest {
    async request(url: string, data: any) {
        try {
            const options: any = {
                url,
                method: 'POST',
                data,
                dataType: 'json',
            }
            return uni.request(options)
        } catch (error) {
            console.error(error)
            showError('您没有该操作权限')
            throw error
        }
    }
}

export const cloud = new Cloud({
    baseUrl: API_BASE_URL,
    dbProxyUrl: '/proxy/app',
    getAccessToken: () => getToken() || '',
    requestClass: CloudRequest,
    environment: EnvironmentType.UNI_APP,
})

export const DB = cloud.database()
