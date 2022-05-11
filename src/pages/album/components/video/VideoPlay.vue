<template>
  <view class="box">
    <!--video原视频容器-->
    <video id="myVideo"
           :controls="videoButton"
           :enable-progress-gesture="videoButton"
           :initial-time="watchHistory"
           :show-center-play-btn="videoButton"
           :show-fullscreen-btn="videoButton"
           :src="videoAddress(videoData.materialData?.href)"
           autoplay
           @fullscreenchange="videoFullScreen"
           @timeupdate="videoTimeUpdate">
      <cover-view>
        <view :class="videoScreen? 'coverFull cover':'coverNoFull cover'">
          <view v-for="(item,index) in currentDot" :key="index">
            <teleport :disabled="videoScreen || item.type !== CoreDotType.题目" to="#app">
              <Dot :data="item" :videoScreen="videoScreen" @addParameters="addParameters" @videoPlay="videoPlay" @videoStop="videoStop" />
            </teleport>
          </view>
        </view>
      </cover-view>
    </video>
  </view>
</template>

<script lang="ts" setup>
import { CoreDotType } from '@/model/entity/CoreDot'
import { videoService } from '@/pages/album/hooks/videoService'
import { videoAddress } from '@/utils/video'
import Dot from '../Dot'

//传来的作品_id
const props = defineProps({
  workId: {
    type: String,
    required: true,
  },
  albumId: {
    type: String,
    required: true,
  },
  watchHistory: {
    type: Number,
    required: true,
    default: 0,
  },
})

const {
  videoButton,
  videoScreen,
  videoData,
  currentDot,
  addParameters,
  videoStop,
  videoPlay,
  videoTimeUpdate,
} = videoService('myVideo', props)

/**
 * 当视频进入和退出全屏时触发
 */
const videoFullScreen = () => {
  screen.orientation.lock('landscape')
  videoScreen.value = !videoScreen.value
}

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
