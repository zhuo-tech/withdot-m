<script lang="ts" setup>
import { purchasedService } from '@/pages/my/hooks/purchasedService'
import { videoAddress } from '@/utils/video'

const {purchasedAlbumList, toAlbum} = purchasedService()
</script>

<template>
  <view class="box">
    <view v-if="purchasedAlbumList.length === 0" class="noData">您还没有购买的专辑</view>
    <view v-for="(item,index) in purchasedAlbumList" v-else :key="index" class="item">
      <view>
        <image :src="videoAddress(item.album.coverHref)" mode="aspectFill"></image>
      </view>
      <view>{{ item.album.title }}</view>
      <view @click="toAlbum(item.album._id)">立即观看</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
page {
  background-color: #f9f9f9;
}

.box {
  padding: 0 30rpx 30rpx 30rpx;
}

.item {
  height: 670rpx;
  width: 100%;
  border-radius: 16rpx;
  background: linear-gradient(to top, rgba(230, 237, 254, 0.5882), rgba(230, 237, 254, 1));
  font-family: PingFang SC Bold;
  font-weight: Bold;
  font-size: 40rpx;
  color: rgba(51, 51, 51, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 32rpx rgba(160, 160, 160, 0.7);
  margin-top: 32rpx;

  > view:nth-of-type(1) {
    width: 260rpx;
    height: 374rpx;
    border-radius: 8rpx;

    > image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8rpx;
    }
  }

  > view:nth-of-type(3) {
    border-radius: 16rpx;
    background-color: rgb(13, 121, 255);
    width: 232rpx;
    height: 74rpx;
    font-size: 28rpx;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 74rpx;
    text-align: center;
  }
}

.noData {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
