import { getCurrentBaseURL } from '@/utils/url'

/**
 * @see https://cn.vitejs.dev/config/#envprefix
 */
const ENV_CONSTANT = import.meta.env

/**
 * HTTP 接口请求入口地址
 */
export const API_BASE_URL = ENV_CONSTANT.VUE_APP_BASE_API

/**
 * 当前站部署地址，主要用于授权等场景
 */
export const DEPLOY_URL = getCurrentBaseURL()

/**
 * 构建信息
 */
export const BUILD_INFO = {
  // 代码版本：tag or hash
  version: ENV_CONSTANT.VUE_APP_BUILD_VERSION,
  // 代码提交版本 git commit version hash
  commithash: ENV_CONSTANT.VUE_APP_BUILD_COMMITHASH,
  // 代码分支: git branch
  branch: ENV_CONSTANT.VUE_APP_BUILD_BRANCH,
  // 构建时间: number (ms)
  time: ENV_CONSTANT.VUE_APP_BUILD_TIME,
}
