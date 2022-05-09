import { VideoDataType, VideoFun } from '@/api/album/videoApi'
import { determineWhetherToPay } from '@/api/order/orderApi'
import { CoreDot } from '@/model/entity/CoreDot'
import { getUserInfo } from '@/utils/token'
import { Dialog, Notify } from 'vant'
import { ref } from 'vue'

export function videoService() {
    //视频实例
    const videoContext = uni.createVideoContext('myVideo')

    //视频控件(是否显示默认播放控件（播放/暂停按钮、播放进度、时间）,是否显示全屏按钮.是否显示视频中间的播放按钮)
    const videoButton = ref(true)

    //绑定video是否全屏
    const videoScreen = ref(false)

    //视频数据
    let videoData = ref<VideoDataType>({} as VideoDataType)

    //视频打点数据
    let dotDate = ref<CoreDot[]>([])

    //当前打点数据
    const currentDot = ref<CoreDot[]>([])

    /**
     * 获得视频数据
     * @returns {Promise<void>}
     */
    const getVideoData = async (workId: string, albumId: string) => {
        await VideoFun().getVideoFun(workId, albumId).then((response: any) => {
            videoData.value = response
            dotDate.value = response.dotData
            dataProcessing()
        }).catch((err: any) => {
            Notify({type: 'danger', message: err.toString()})
        })
    }

    /**
     * 处理打点数据 是否已经展示guole alreadyShow:boolean
     */
    const dataProcessing = () => {
        dotDate.value?.forEach(item => {
            item.alreadyShow = false
        })
    }

    /**
     * 视频播放时时间变化 并过滤出 该时间的打点数据
     * @param event
     */
    const currentTime = (event: any) => {
        const {currentTime} = event.detail
        currentDot.value = dotDate.value?.filter(
            ({start, end, alreadyShow}) => currentTime >= start && currentTime <= (end ?? start) && !alreadyShow,
        )
    }

    /**
     * 修改打点参数 alreadyShow 已经展示过了
     * @param {string} _id 打点的_id
     */
    const addParameters = (_id: string) => {
        dotDate.value.forEach(item => {
            if (item._id === _id) {
                item.alreadyShow = true
            }
        })
    }

    /**
     * 视频停止播放
     */
    const vieoStop = () => {
        videoContext.pause()
        videoDisableOperation()
    }

    /**
     * 视频开始播放
     */
    const videoPlay = () => {
        videoContext.play()
        startVideoBUtton()
    }

    /**
     * 视频禁用操作
     */
    const videoDisableOperation = () => {
        videoButton.value = false
    }

    const startVideoBUtton = () => {
        videoButton.value = true
    }

    const tryWatch = async (event: any, albumId: string) => {
        const {currentTime} = event.detail
        //0  收费
        const {_id} = getUserInfo()
        const isPay = await determineWhetherToPay(_id, albumId)
        if (isPay) {
            return
        }
        if (videoData.value.isFree === 0) {
            if (currentTime >= videoData.value.trialTime) {
                vieoStop()
                Dialog.confirm({
                        title: '付费作品',
                        message:
                            '该作品为收费作品,试看时间已结束。',
                    })
                    .then(() => {
                        uni.navigateTo({url: `/pages/pay/index?albumId=${ albumId }`})
                    })
                    .catch(() => {
                        uni.switchTab({url: '/pages/index/index'})
                    })
            }
        }
    }
    return {
        videoContext,
        videoButton,
        videoScreen,
        videoData,
        dotDate,
        getVideoData,
        currentDot,
        currentTime,
        addParameters,
        vieoStop,
        videoPlay,
        videoDisableOperation,
        startVideoBUtton,
        tryWatch,
    }
}
