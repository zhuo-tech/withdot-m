import { Notify } from 'vant'
import { ref } from 'vue'
import { getAlbumListApi } from '../../../api/home/index'

export function indexService() {
    //绑定搜索框
    const searchValue = ref<string>()
    const albumList = ref([])
    const getAlbumList = () => {
        getAlbumListApi().then(response=>{
            console.log(response)
        }).catch(err => {
            Notify({ type: 'danger', message: err });
        })

    }

    return {
        searchValue,
        albumList,
        getAlbumList,
    }
}
