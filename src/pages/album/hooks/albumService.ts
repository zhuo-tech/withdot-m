import { getAlbumWorklApi } from '@/api/album/album'
import { Notify } from 'vant'
import { ref } from 'vue'

export function albumService() {
    const albumWork = ref()

    const getAblumWorkList = (albumId: string = '6268f20c9ff4edb907537198') => {
        getAlbumWorklApi(albumId).then(response => {
            console.log(response,'???????')
        }).catch(err => {
            Notify({type: 'danger', message: err.toString()})
        })
    }
    return {
        albumWork,
        getAblumWorkList,
    }
}
