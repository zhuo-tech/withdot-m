import { getAlbumListApi } from '@/api/home/index'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { judgmentLoginPay, whetherToLogIn } from '@/utils/token'
import { onReachBottom } from '@dcloudio/uni-app'
import { Notify } from 'vant'
import { Ref, ref } from 'vue'

type ReturnType = {
    noMore: Ref<boolean>
    searchWord: Ref<string>
    albumList: Ref<Array<CoreAlbum>>
    getAlbumList(): void
    toAlbum(id: string, isThereAWork: Boolean): void
    getSearchAlbumList(): void
}

export function useIndex(): ReturnType {
    //绑定搜索框
    const searchWord = ref<string>('')
    const noMore = ref(false)
    //专辑数据列表
    const albumList = ref<CoreAlbum[]>([])

    let pages = ref({
        current: 1,
        size: 5,
        total: 0,
    })

    const getAlbumList = () => {
        getAlbumListApi(pages.value, searchWord.value)
            .then(({list, total}) => {
                pages.value.total = total
                albumList.value.push(...list)
                console.log(albumList, '主页专辑列表数据')
            }).catch(err => Notify({type: 'danger', message: err.toString()}))
    }
    /**
     * 跳转至专辑详情页,判断是否登录 是否支付 是否含有作品
     * @param {string} goodsId 专辑Id
     * @param {number} isThereAWork 专辑是否含有作品 true: 含有 false: 不含有
     */
    const toAlbum = async (goodsId: string, isThereAWork: Boolean) => {
        await judgmentLoginPay(goodsId, isThereAWork)
    }

    // 触底加载
    onReachBottom(() => {
        if (albumList.value.length >= pages.value.total) {
            noMore.value = true
            return
        }
        pages.value.current = pages.value.current + 1
        getAlbumList()
    })

    return {
        noMore,
        searchWord,
        albumList,
        getAlbumList,
        toAlbum,
        getSearchAlbumList() {
            albumList.value = []
            pages.value.current = 1
            getAlbumListApi(pages.value, searchWord.value)
                .then(({list, total}) => {
                    pages.value.total = total
                    albumList.value = list
                }).catch(err => Notify({type: 'danger', message: err.toString()}))
        },
    }
}
