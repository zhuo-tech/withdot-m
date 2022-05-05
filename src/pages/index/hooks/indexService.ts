import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { whetherToLogIn } from '@/utils/token'
import { Notify } from 'vant'
import { ref } from 'vue'
import { getAlbumListApi } from '@/api/home/index'
import { cloud } from '@/config/cloud'

const DB = cloud.database()

export function indexService() {
    //绑定搜索框
    const searchValue = ref<string>()

    //专辑数据列表
    const albumList = ref<CoreAlbum[]>([])

    const getAlbumList = async () => {
        getAlbumListApi().then(response => {
            albumList.value = response.data
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    const toAlbum = (albumId: string) => {
        const path = `/pages/album/index?albumId=${ albumId }`
        whetherToLogIn(path)
    }

    return {
        searchValue,
        albumList,
        getAlbumList,
        toAlbum,
    }
}
