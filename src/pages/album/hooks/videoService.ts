import { getVideoData, hisVodApi, VideoDataType } from '@/api/album/videoApi'
import { determineWhetherToPay } from '@/api/order/orderApi'
import { CoreAlbumWork } from '@/model/entity/CoreAlbum'
import { CoreDot } from '@/model/entity/CoreDot'
import { throttle } from '@/utils/throttle'
import { Dialog, Notify } from 'vant'
import { ExtractPropTypes, ref, watch } from 'vue'

type PropsType = Readonly<ExtractPropTypes<{ workId: { type: StringConstructor, required: true }, albumId: { type: StringConstructor, required: true }, watchHistory: { type: NumberConstructor, required: true } }>>

export function videoService(videoId: string, props: PropsType) {
    // 视频实例
    const videoContext = uni.createVideoContext(videoId)
    // 视频控件(是否显示默认播放控件（播放/暂停按钮、播放进度、时间）,是否显示全屏按钮.是否显示视频中间的播放按钮)
    const videoButton = ref(false)
    // 绑定video是否全屏
    const videoScreen = ref(false)

    // 视频数据
    let videoData = ref<VideoDataType>({} as any)
    // 视频打点数据 (videoData 的视图)
    let dotDate = ref<CoreDot[]>([])
    // 当前打点数据
    const currentDot = ref<CoreDot[]>([])
    // 是否试看
    const isTry = ref(true)

    // 视频停止播放
    const videoStop = () => {
        videoContext.pause()
        videoButton.value = false
    }
    // 视频开始播放
    const videoPlay = () => {
        videoContext.play()
        videoButton.value = true
    }

    // 初始化: 判断是否试看: 已购买 / 免费专辑, 无需试看
    determineWhetherToPay(props.albumId)
        .then(noChargeOrBought => isTry.value = !noChargeOrBought)

    // 获得视频数据
    const videoDataInit = (workId: string, albumId: string) => {
        getVideoData(workId, albumId)
            .then(async res => {
                videoData.value = res
                dotDate.value = res.dotData
                // 初始化打点状态 未展示: alreadyShow
                dotDate.value?.forEach(item => item.alreadyShow = false)

                // 如果视频URL不存在, 禁用 video 控制按钮
                videoButton.value = !!videoData.value.materialData.href

            }).catch((err: any) => {
            Notify({type: 'danger', message: err.toString()})
        })
    }
    // 监听作品_id变化切换视频数据
    watch(() => props.workId, () => videoDataInit(props.workId as string, props.albumId as string))

    const debounceHisVodApi = throttle(hisVodApi, 1000)

    return {
        videoButton,
        videoScreen,
        videoData,
        dotDate,
        currentDot,
        videoStop,
        videoPlay,
        /**
         * 修改打点参数 alreadyShow 已经展示过了
         * @param {string} _id
         */
        addParameters(_id: string) {
            dotDate.value.forEach(item => {
                if (item._id === _id) {
                    item.alreadyShow = true
                }
            })
        },
        /**
         * 视频播放回调
         */
        videoTimeUpdate(event: any) {
            let {currentTime} = event.detail
            if (props.watchHistory !== 0 && currentTime === 0) {
                currentTime = props.watchHistory
            }

            // 视频播放时时间变化 并过滤出 该时间的打点数据
            currentDot.value = dotDate.value?.filter(
                ({start, end, alreadyShow}) => currentTime >= start && currentTime <= (end ?? start) && !alreadyShow,
            )
            if (isTry.value) {
                const needPay = CoreAlbumWork.checkIsFree(videoData.value.isFree)
                if (needPay && currentTime >= videoData.value.trialTime) {
                    videoStop()
                    //退出全屏模式
                    videoContext.exitFullScreen()
                    //弹框
                    popUp(props.albumId)
                }
            }

            //视频添加更新观看时长记录
            debounceHisVodApi(props.albumId, props.workId, currentTime)
        },
    }
}

function popUp(albumId: string) {
    Dialog.confirm({
            title: '付费作品',
            message: '该作品为收费作品,试看时间已结束。',
        })
        .then(() => uni.navigateTo({url: `/pages/pay/index?albumId=${ albumId }`}))
        .catch(() => uni.switchTab({url: '/pages/index/index'}))
}
