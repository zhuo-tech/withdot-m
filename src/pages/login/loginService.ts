import { mobileSendCode, smsLogin } from '@/api/login/loginApi'
import { Notify } from 'vant'
import { ref } from 'vue'

export function loginService() {
    const form = ref({
        phone: '',
        code: null,
    })

    const time = ref()

    const clearPhone = () => {
        form.value.phone = ''
    }

    const getCode = () => {
        if (!form.value.phone) {
            Notify('请填写手机号')
            return
        }
        countdown()
        mobileSendCode(form.value.phone).then(() => {
        }).catch((err: any) => {
            Notify(err.toString())
        })
    }

    const countdown = () => {
        time.value = 60
        const timing = setInterval(() => {
            if (time.value <= 0) {
                clearInterval(timing)
            } else {
                time.value--
            }

        }, 1000)
    }

    const onsubmit = () => {
        if (!form.value.phone) {
            Notify('请输入手机号码')
            return
        }
        if (!form.value.code) {
            Notify('请输入验证码')
            return
        }
        smsLogin(form.value.phone, form.value.code).then(() => {
            uni.navigateBack({delta: 1})
        }).catch(err => {
            Notify(err.toString())
        })
    }
    return {
        time,
        form,
        clearPhone,
        getCode,
        onsubmit,
    }
}