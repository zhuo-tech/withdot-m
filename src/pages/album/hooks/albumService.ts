import { getAlbumDetailApi, getAlbumWorklApi } from '@/api/album/album'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { CoreWork } from '@/model/entity/CoreWork'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref, watch } from 'vue'

export function albumService() {
    const albumWork = ref<CoreWork[]>()

    const work_id = ref('')

    const albumId = ref('')

    const albumDetail = ref<CoreAlbum>({} as CoreAlbum)

    const getAblumWorkList = (albumId: string) => {
        getAlbumWorklApi(albumId).then(response => {
            albumWork.value = response?.workList
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    const playVideo = (workId: string) => {
        work_id.value = workId
    }

    const getAlbumDetail = (_id: string) => {
        getAlbumDetailApi(_id).then(res => {
            albumDetail.value = res
        }).catch(err => {
            Notify(err.toString())
        })
    }

    const toPay = (albumId: string) => {
        uni.navigateTo({url: `/pages/pay/index?albumId=${ albumId }`})
    }


    onLoad((options) => {
        albumId.value = options.albumId as string
        getAlbumDetail(options.albumId as string)
        getAblumWorkList(options.albumId as string)
    })
    return {
        albumWork,
        work_id,
        getAblumWorkList,
        playVideo,
        albumDetail,
        toPay,
        albumId,
    }
}
