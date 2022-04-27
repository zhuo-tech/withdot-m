import { Notify } from 'vant'
import { ref } from 'vue'
import { getAlbumListApi } from '@/api/home/index'
import { cloud } from '@/config/cloud'

export function indexService() {
   const _ =  cloud.database()
    //绑定搜索框
    const searchValue = ref<string>()
    const albumList = ref([])
    const getAlbumList =async () => {
       getAlbumListApi().then(response => {
           console.log(response,'?????????')
       } ).catch(err => {
           Notify({type:'danger',message:err.toString()})
       })
    }

    return {
        searchValue,
        albumList,
        getAlbumList,
    }
}
