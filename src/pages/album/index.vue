<template>
  <view class="box">
    <VideoPlay :albumId="albumId" :watchHistory="watchHistory" :workId="workId" class="videoPlay"></VideoPlay>
    <view class="course">
      <view class="title">课程目录</view>
      <view v-for="(item,index) in albumWork"
            :key="index"
            class="content"
            @click="playVideo(item._id,item.watchHistory,index)">
        <view class="workItem">
          <view class="workItemLeft">
            <view class="contentName">{{ `${ index + 1 }. ${ item.name }` }}</view>
            <view class="viewer">{{ item.viewers }}人已学</view>
          </view>
          <view v-if="currentVideo === index" class="nowPlay">
            <img alt="" src="../../static/album/now.png">
            正在播放
          </view>
          <view v-else>
            <view v-if="!item.watchHistory">暂未观看</view>
            <view v-else class="history">上次观看至 {{ filterWatchHisTory(Number(item.watchHistory.toFixed(0))) }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import VideoPlay from './components/video/VideoPlay.vue'
import { albumService } from '@/pages/album/hooks/albumService'
import { filterWatchHisTory } from '@/utils/day'

const {
  workId,
  albumWork,
  playVideo,
  albumId,
  watchHistory,
  currentVideo,
} = albumService()

</script>

<style lang="less" scoped>

.box {
  position: relative;

  .videoPlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 410rpx;
    width: 100%;
  }

  .course {
    width: 100%;
    margin-top: 420rpx;

    .title {
      margin-left: 20rpx;
      font-size: 32rpx;
      font-weight: Bold;
      color: rgba(51, 51, 51, 1);
      font-family: PingFang SC;
    }

    .content {
      width: 100%;
      height: 70rpx;
      padding: 22rpx 0 14rpx 0;

      .workItem {
        padding: 20rpx 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid rgba(250, 250, 250, 1);

        .workItemLeft {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          .viewer {
            color: rgba(153, 153, 153, 1);
            font-size: 24rpx;
            margin-top: 20rpx;
          }

          .contentName {
            font-size: 28rpx;
          }
        }

        .nowPlay {
          color: #0d79ff;
        }

        .history {
          color: rgba(13, 121, 255, 1);
          font-size: 24rpx;
          font-family: "Comic Sans MS";
        }

        > view:nth-of-type(2) {
          margin-right: 80rpx;
        }
      }


      .size {
        margin-top: 18rpx;
        color: rgba(153, 153, 153, 1);
        font-size: 24rpx;
      }
    }
  }
}

.nodata {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
