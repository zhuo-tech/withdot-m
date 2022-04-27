<template>
  <view class="box">
    <!--video原视频容器-->
    <video id="myVideo" :src="videoAddress(videoData.materialData?.href)" @timeupdate="currentTime" />
    <view class="cover">
      <Dot v-for="(item,index) in currentDot" :key="index" :data="item"  />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Dot from '../Dot'
import { CoreDot } from '@/model/entity/CoreDot'
import { videoAddress } from '@/utils/video'
import { Notify } from 'vant'
import { ref } from 'vue'
import { VideoDataType, VideoFun } from '@/api/album/videoApi'

let videoData = ref<VideoDataType>({} as VideoDataType)

let dotDate = ref<CoreDot[]>([])
//视频实例
const videoContext = uni.createVideoContext('myVideo')

const currentDot = ref<CoreDot[]>([])
/**
 * 获得视频数据
 * @returns {Promise<void>}
 */
const getVideoData = async () => {
  await VideoFun().getVideoFun('6253b86129ef3d8dd5669c79').then((response:any) => {
    videoData.value = response
    dotDate.value = response.dotData
  }).catch((err:any) => {
    Notify({type: 'danger', message: err.toString()})
  })
}

const currentTime = (event: any) => {
  const {currentTime} = event.detail
  currentDot.value = dotDate.value.filter(({start, end}) => currentTime >= start && currentTime <= (end ?? start))
}

getVideoData()
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
    height: 410rpx;
    z-index: 1;
    color: red;
  }
}

</style>
