<script lang="ts" setup>
import { orderFormService } from '@/pages/my/hooks/orderFormService'
import { videoAddress } from '@/utils/video'

const {orderList, toDetail} = orderFormService()

</script>

<template>
  <view class="box">
    <view v-if="orderList && orderList.length <= 0" class="noData">您还没有购买专辑</view>
    <view v-else v-for="(item,index) in orderList" :key="index" class="item" @click="toDetail(item._id)">
      <view>
        <image :src="videoAddress(item.album.coverHref)" mode="aspectFill"></image>
      </view>
      <view>{{ item.album.title }}</view>
      <view>￥:{{ item.amount }}</view>
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
  height: 180rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: PingFang SC;
  font-weight: Bold;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-top: 32rpx;

  > view:nth-of-type(1) {
    width: 90rpx;
    height: 128rpx;
    border-radius: 8rpx;

    > image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8rpx;
    }
  }

  > view:nth-of-type(2) {
    width: 176rpx;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-left: 24rpx;
    color: rgba(51, 51, 51, 1);
    font-size: 32rpx;
  }

  > view:nth-of-type(3) {
    margin-left: auto;
    font-size: 28rpx;
    color: rgba(102, 102, 102, 1);
  }
}

.noData {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
