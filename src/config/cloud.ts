import { Cloud, EnvironmentType, UniRequest } from 'laf-client-sdk'
import { API_BASE_URL } from '@/config/config'
import { getToken } from '@/utils/index'
import { showError } from '@/utils/show'

/**
 * 自定义请求类，可截获请求响应错误
 */
class CloudRequest extends UniRequest {
  async request(url: string, data: any) {
    try {
      return await super.request(url, data)
    } catch (error) {
      console.error(error)
      showError('请求出错了')
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
