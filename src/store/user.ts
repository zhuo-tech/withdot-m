import { getUserInfo } from '@/utils/token'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
    state: () => {
        const _id = ref('')
        const nickname = ref('')
        const username = ref('')
        const phone = ref('')
        const avatar = ref('')

        return {nickname, username, phone, avatar, _id}
    },
    actions: {
        update() {
            getUserInfo().then((info: any) => {
                const {_id, username, nickname, avatar, phone} = info
                this._id = _id
                this.username = username
                this.nickname = nickname
                this.avatar = avatar
                this.phone = phone
            })
        },
    },
})

