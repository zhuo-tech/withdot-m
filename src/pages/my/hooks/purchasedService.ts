import { purchasedAlbumListApi } from '@/api/order/orderApi'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'
import { getUserInfo } from '@/utils/token'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'

const {_id} = getUserInfo()

export function purchasedService() {
    const purchasedAlbumList = ref<PayGoodsOrder[]>([] as any)

    const getlist = () => {
        if (!_id) {
            Notify('您还没有登陆')
            return
        }
        purchasedAlbumListApi(_id).then(res => {
            console.log(res)
            purchasedAlbumList.value = res
        }).catch(err => {
            Notify(err.toString())
        })
    }
    const toAlbum = (id: string) => {
        uni.navigateTo({url: `/pages/album/index?albumId=${ id }`})
    }

    onLoad(() => {
        getlist()
    })
    return {
        purchasedAlbumList,
        toAlbum,
    }
}
