import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { whetherToLogIn } from '@/utils/token'
import { onReachBottom } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { ref } from 'vue'
import { getAlbumListApi } from '@/api/home/index'

export function indexService() {
    //绑定搜索框
    const searchValue = ref<string>()

    const noMore = ref(false)
    //专辑数据列表
    const albumList = ref<CoreAlbum[]>([])

    let pages = ref({
        current: 1,
        size: 5,
        total: 100,
    })

    const getAlbumList = async () => {
        getAlbumListApi(pages.value).then(response => {
            pages.value.total = response.total as number
            albumList.value.push(...response.data)
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    const toAlbum = (albumId: string) => {
        const path = `/pages/album/index?albumId=${ albumId }`
        whetherToLogIn(path)
    }

    const getSearchAlbumList = () => {
        albumList.value = []
        pages.value.current = 1
        getAlbumListApi(pages.value, searchValue.value).then(response => {
            pages.value.total = response.total as number
            albumList.value.push(...response.data)
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    onReachBottom(() => {
        if (albumList.value.length >= pages.value.total) {
            noMore.value = true
        } else {
            if (!searchValue.value) {
                pages.value.current = pages.value.current + 1
                getAlbumList().then()
            } else {
                pages.value.current = pages.value.current + 1
                getSearchAlbumList()
            }
        }
    })

    return {
        getSearchAlbumList,
        noMore,
        searchValue,
        albumList,
        getAlbumList,
        toAlbum,
    }
}
