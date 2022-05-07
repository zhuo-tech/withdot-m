<template>
  <view class="box">
    <!--video原视频容器-->
    <video id="myVideo"
           :controls="videoButton"
           :show-center-play-btn="videoButton"
           :enable-progress-gesture="videoButton"
           :show-fullscreen-btn="videoButton"
           :src="videoAddress(videoData.materialData?.href)"
           autoplay
           @fullscreenchange="videoFullScreen"
           @timeupdate="currentTime">
      <cover-view>
        <view :class="videoScreen? 'coverFull cover':'coverNoFull cover'">
          <view v-for="(item,index) in currentDot" :key="index">
            <teleport :disabled="videoScreen || item.type !== CoreDotType.题目" to="#app">
              <Dot :data="item" :videoScreen="videoScreen" @addParameters="addParameters" @videoPlay="videoPlay" @videoStop="vieoStop" />
            </teleport>
          </view>
        </view>
      </cover-view>
    </video>
  </view>
</template>

<script lang="ts" setup>
import { videoService } from '@/pages/album/hooks/videoService'
import { CoreDotType } from '@/model/entity/CoreDot'
import Dot from '../Dot'
import { videoAddress } from '@/utils/video'
import { watch } from 'vue'

const {
  videoButton,
  videoScreen,
  videoData,
  getVideoData,
  currentDot,
  currentTime,
  addParameters,
  vieoStop,
  videoPlay,
  videoDisableOperation,
  startVideoBUtton,
} = videoService()

//传来的作品_id
const props = defineProps({
  workId: {
    type: String,
  },
})

/**
 * 当视频进入和退出全屏时触发
 */
const videoFullScreen = () => {
  screen.orientation.lock('landscape')
  videoScreen.value = !videoScreen.value
  console.log(videoScreen.value)
}

/**
 * 监听作品_id变化切换视频数据
 */
watch(() => props.workId, () => {
  getVideoData(props.workId as string)
})

watch(() => videoData.value.materialData?.href, () => {
  if (!videoData.value.materialData?.href) {
    videoDisableOperation()
  } else {
    startVideoBUtton()
  }
}, {immediate: true})
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
