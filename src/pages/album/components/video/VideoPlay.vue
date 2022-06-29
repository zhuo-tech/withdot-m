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
           @ended="finishPlaying"
           @timeupdate="videoTimeUpdate">
      <cover-view :class="videoScreen? 'coverView':''">
        <view :class="videoScreen? 'coverFull cover':'coverNoFull cover'">
          <view v-for="(item,index) in currentDot" :key="index">
            <teleport :disabled="videoScreen || item.type !== CoreDotType.题目" to="#app">
              <Dot :data="item"
                   :videoScreen="videoScreen"
                   @addParameters="addParameters"
                   @videoPlay="videoPlay"
                   @videoStop="videoStop" />
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
  //作品id
  workId: {
    type: String,
    required: true,
  },
  //专辑id
  albumId: {
    type: String,
    required: true,
  },
  //观看历史
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
  finishPlaying,
} = videoService('myVideo', props)

/**
 * 当视频进入和退出全屏时触发
 */
const videoFullScreen = (event: any) => {
  videoScreen.value = event.detail.fullScreen
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
    color: red;
  }
}

.coverFull {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.coverNoFull {
  height: 410rpx;
}

</style>
