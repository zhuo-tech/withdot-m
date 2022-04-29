<template>
  <view class="box">
    <!--video原视频容器-->
    <video id="myVideo"
           :controls="videoButton"
           :show-center-play-btn="videoButton"
           :show-fullscreen-btn="videoButton"
           autoplay
           :src="videoAddress(videoData.materialData?.href)"
           @fullscreenchange="videoFullScreen"
           @timeupdate="currentTime">
      <cover-view>
        <view :class="videoScreen? 'coverFull cover':'coverNoFull cover'">
          <view v-for="(item,index) in currentDot" :key="index">
            <teleport :disabled="videoScreen || item.type !== CoreDotType.题目" to="#app">
              <Dot :data="item" :videoScreen="videoScreen" @videoPlay="videoPlay" @videoStop="vieoStop" />
            </teleport>
          </view>
        </view>
      </cover-view>
    </video>
  </view>
</template>

<script lang="ts" setup>
import { CoreDotType } from '@/model/entity/CoreDot'
import Dot from '../Dot'
import { CoreDot } from '@/model/entity/CoreDot'
import { videoAddress } from '@/utils/video'
import { Notify } from 'vant'
import { ref, watch } from 'vue'
import { VideoDataType, VideoFun } from '@/api/album/videoApi'

//传来的作品_id
const props = defineProps({
  workId: {
    type: String,
  },
})

//视频控件(是否显示默认播放控件（播放/暂停按钮、播放进度、时间）,是否显示全屏按钮.是否显示视频中间的播放按钮)
const videoButton = ref(true)

//绑定video是否全屏
const videoScreen = ref(false)

//视频数据
let videoData = ref<VideoDataType>({} as VideoDataType)

//视频打点数据
let dotDate = ref<CoreDot[]>([])

//视频实例
const videoContext = uni.createVideoContext('myVideo')

//当前打点数据
const currentDot = ref<CoreDot[]>([])

/**
 * 获得视频数据
 * @returns {Promise<void>}
 */
const getVideoData = async () => {
  await VideoFun().getVideoFun(props.workId as string).then((response: any) => {
    videoData.value = response
    dotDate.value = response.dotData
  }).catch((err: any) => {
    Notify({type: 'danger', message: err.toString()})
  })
}

/**
 * 当视频进入和退出全屏时触发
 */
const videoFullScreen = () => {
  screen.orientation.lock('landscape')
  videoScreen.value = !videoScreen.value
}

/**
 * 视频播放时时间变化 并过滤出 该时间的打点数据
 * @param event
 */
const currentTime = (event: any) => {
  const {currentTime} = event.detail
  currentDot.value = dotDate.value.filter(({start, end}) => currentTime >= start && currentTime <= (end ?? start))
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

/**
 * 监听作品_id变化切换视频数据
 */
watch(() => props.workId, () => {
  getVideoData()
})

</script>

<style lang="less" scoped>

.box {
  position: relative;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 410rpx;
    z-index: 0;
  }

  .cover {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    color: red;
  }
}

.coverFull {
  height: 100vh;
}

.coverNoFull {
  height: 410rpx;
}
</style>
