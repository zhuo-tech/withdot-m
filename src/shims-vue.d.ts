import 'vue-router'

declare global {

    interface ImportMetaEnv {
        VUE_APP_BASE_API: string
        VUE_APP_LAF_DB_PROXY: string
    }
}
