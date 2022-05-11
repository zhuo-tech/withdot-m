import { getAlbumDetailApi } from '@/api/album/album'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { computed, ref } from 'vue'

export function albumService() {
    const albumDetail = ref<CoreAlbum>({} as CoreAlbum)
    const albumWork = computed(() => albumDetail.value.workList)
    const albumId = computed(() => albumDetail.value._id)
    const workId = ref('')
    const watchHistory = ref()
    const currentVideo = ref<null | number>()

    const playVideo = (id: string, history: number, index: number) => {
        workId.value = id
        watchHistory.value = history
        currentVideo.value = index
        getAlbumDetail(albumDetail.value._id)
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

    const toAlbum = (albumId: string) => {
        uni.navigateTo({url: `/pages/album/index?albumId=${ albumId }`})
    }

    onLoad((options) => getAlbumDetail(options.albumId as string))
    return {
        albumWork,
        workId,
        playVideo,
        albumDetail,
        toPay,
        albumId,
        toAlbum,
        watchHistory,
        currentVideo,
    }
}
