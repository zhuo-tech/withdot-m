import { getAlbumDetailApi } from '@/api/album/album'
import { payApi } from '@/api/order/orderApi'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { getUserInfo } from '@/utils/token'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'

export function indexService() {
    const albumDetail = ref<CoreAlbum>({} as CoreAlbum)

    const checked = ref('1')

    const getAlbumDetail = (_id: string) => {
        getAlbumDetailApi(_id).then(res => {
            albumDetail.value = res
        }).catch(err => {
            Notify(err.toString())
        })
    }

    const {phone} = getUserInfo()

    const pay = () => {
        switch (checked.value) {
            case '1':
                wxPay()
                break
            default:
        }
    }

    const wxPay = () => {
        payApi(albumDetail.value.title, Number(albumDetail.value.sellingPrice), 'APP', albumDetail.value._id).then().catch(err => {
            Notify(err.error_msg.toString())
        })
    }

    onLoad((options) => {
        getAlbumDetail(options.albumId as string)
    })
    return {
        albumDetail,
        phone,
        checked,
        pay,
    }
}
