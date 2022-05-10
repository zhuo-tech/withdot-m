<script lang="ts" setup>
import { videoAddress } from '@/utils/video'
import { albumService } from '@/pages/album/hooks/albumService'

const {albumDetail, albumWork, toPay, toAlbum} = albumService()
</script>

<template>
  <view>
    <view class="album">
      <view class="img">
        <img :src="videoAddress(albumDetail.coverHref)" alt="">
      </view>
      <view>
        <view class="title">{{ albumDetail.title }}</view>
        <view class="price">
          <span>￥</span>
          {{ albumDetail.sellingPrice }}
        </view>
      </view>
    </view>
    <van-tabs color="#0d79ff">
      <van-tab title="详情">
        <view class="outDetail">
          <view class="detail">
            <view>课程介绍</view>
            <view>{{ albumDetail.desc }}</view>
          </view>
        </view>
      </van-tab>
      <van-tab title="目录">
        <view class="course">
          <view class="title">课程目录</view>
          <view v-for="(item,index) in albumWork" :key="index" class="content">
            <view>
              <view class="contentName">{{ `${ index + 1 }. ${ item.name }` }}</view>
              <!--<view class="size">时长-->
              <!--  <span>30:01</span>-->
              <!--</view>-->
            </view>
          </view>
        </view>
      </van-tab>
    </van-tabs>
    <view class="bth">
      <view @click="toAlbum(albumDetail._id)">试看</view>
      <view @click="toPay(albumDetail._id)">立即购买</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.album {
  height: 270rpx;
  padding: 34rpx 40rpx;
  display: flex;
  justify-content: flex-start;

  .img {
    width: 200rpx;
    height: 100%;
    border-radius: 8rpx;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8rpx;
    }
  }

  > view:nth-of-type(2) {
    width: 432rpx;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: PingFang SC;
    font-weight: Bold;
    font-size: 36rpx;

    .title {
      margin-left: 32rpx;
      overflow: hidden;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .price {
      margin-left: 32rpx;
      color: red;

      > span {
        font-size: 24rpx;
      }
    }
  }
}

.outDetail {
  margin-top: 20rpx;
  background-color: #0D79FF;
  padding: 32rpx 40rpx;
  font-family: PingFang SC;
  font-size: 32rpx;
  min-height: 100%;

  .detail {
    padding: 32rpx 40rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;

    > view:nth-of-type(1) {
      border-left: 4rpx #0d79ff solid;
      padding-left: 10rpx;
      margin-bottom: 20rpx;
    }

    > view:nth-of-type(2) {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-line;
    }
  }
}

.course {
  padding: 32rpx 40rpx;
  border-bottom: 2rpx solid rgba(250, 250, 250, 1);

  .title {
    font-size: 32rpx;
    font-weight: Bold;
    color: rgba(51, 51, 51, 1);
    font-family: PingFang SC;
  }

  .content {
    width: 100%;
    height: 50rpx;
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

.van-tabs {
  border-top: 2rpx #f3f3f3 solid;
  margin-bottom: 100rpx;
}

.bth {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0px -2px 4px rgba(238, 238, 238, 1);

  > view {
    width: 320rpx;
    height: 72rpx;
    border-radius: 100rpx;
    text-align: center;
    line-height: 72rpx;
  }

  > view:nth-of-type(1) {
    background-color: #f5f5f5;
    color: rgba(51, 51, 51, 1);
  }

  > view:nth-of-type(2) {
    background-color: #e75454;
    color: #FFFFFF;
  }
}
</style>
