import { getAlbumWorklApi } from '@/api/album/album'
import { CoreWork } from '@/model/entity/CoreWork'
import { onLoad } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'

export function albumService() {
    const albumWork = ref<CoreWork[]>()

    const work_id = ref('')

    const getAblumWorkList = (albumId: string = '6268f20c9ff4edb907537198') => {
        getAlbumWorklApi(albumId).then(response => {
            albumWork.value = response.workList
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    const playVideo = (workId: string) => {
        work_id.value = workId
    }

    onLoad((options) => {
        getAblumWorkList(options.albumId as string)
    })
    return {
        albumWork,
        work_id,
        getAblumWorkList,
        playVideo,
    }
}
