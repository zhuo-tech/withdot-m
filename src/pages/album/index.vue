<template>
  <view class="box">
    <VideoPlay :workId="work_id"></VideoPlay>
    <view class="course">
      <view class="title">课程目录</view>
      <view v-for="(item,index) in albumWork" :key="index" class="content" @click="playVideo(item._id)">
        <view>
          <view class="contentName">{{ `${ index + 1 }. ${ item.name }` }}</view>
          <view class="size">时长
            <span>30:01</span>
          </view>
        </view>
        <view></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import VideoPlay from './components/video/VideoPlay.vue'
import { albumService } from '@/pages/album/hooks/albumService'

const {work_id, albumWork, playVideo} = albumService()
</script>

<style lang="less" scoped>
.box {
  position: relative;

  .course {
    position: absolute;
    top: 410rpx;
    width: 750rpx;
    padding: 18rpx 40rpx;
    border-bottom: 2rpx solid rgba(250, 250, 250, 1);

    .title {
      font-size: 32rpx;
      font-weight: Bold;
      color: rgba(51, 51, 51, 1);
      font-family: PingFang SC;
    }

    .content {
      width: 100%;
      height: 100rpx;
      padding: 22rpx 0 14rpx 0;

      .contentName {
        font-size: 28rpx;
      }

      .size {
        margin-top: 18rpx;
        color: rgba(153, 153, 153, 1);
        font-size: 24rpx;
      }
    }
  }
}

</style>
