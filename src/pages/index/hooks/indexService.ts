import { CoreAlbum } from '@/model/entity/CoreAlbum'
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
            console.log(albumList.value, '?????????')
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    const toAlbum = (albumId: string) => {
        uni.navigateTo({
            url: `/pages/album/index?albumId=${ albumId }`,
        })
    }

    return {
        searchValue,
        albumList,
        getAlbumList,
        toAlbum,
    }
}
