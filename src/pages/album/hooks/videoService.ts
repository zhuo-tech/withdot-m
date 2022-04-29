import { VideoDataType, VideoFun } from '@/api/album/videoApi'
import { CoreDot } from '@/model/entity/CoreDot'
import { Notify } from 'vant'
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
    const getVideoData = async (workId: string) => {
        await VideoFun().getVideoFun(workId).then((response: any) => {
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
     * 当视频进入和退出全屏时触发
     */
    const videoFullScreen = () => {
        screen.orientation.lock('landscape')
        videoScreen.value = !videoScreen.value
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
    return {
        videoContext,
        videoButton,
        videoScreen,
        videoData,
        dotDate,
        getVideoData,
        currentDot,
        videoFullScreen,
        currentTime,
        addParameters,
        vieoStop,
        videoPlay,
        videoDisableOperation,
        startVideoBUtton,
    }
}
