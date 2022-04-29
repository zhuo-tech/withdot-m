<script lang="ts" setup>
import { ref } from 'vue'

const detail = ref({
  name: '你好啊灼灼',
  price: '250',
})

</script>

<template>
  <view class="box">
    <view class="top">
      <van-icon name="passed" />
      已购买
    </view>
    <view class="detail">
      <view>
        <image src="@/static/树.png"></image>
      </view>
      <view>
        <view>{{ detail.name }}</view>
        <view>￥:{{ detail.price }}</view>
      </view>
    </view>
    <view class="orderFormDetail">
      <view>
        <view>课程金额</view>
        <view>￥:250</view>
      </view>
      <view>
        <view>订单编号</view>
        <view>11111111111111</view>
      </view>
      <view>
        <view>支付时间</view>
        <view>05-16 14:16:17</view>
      </view>
      <view>
        <view>支付金额</view>
        <view>￥:250</view>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
page {
  background-color: #f9f9f9;
}

.box {
  padding: 30rpx;

  .top {
    height: 110rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail {
    display: flex;
    justify-content: flex-start;
    background: #ffffff;
    padding: 46rpx 38rpx;
    font-family: PingFang SC Bold;
    font-weight: Bold;
    font-size: 36rpx;
    color: rgba(51, 51, 51, 1);
    border-radius: 16rpx;

    > view:nth-of-type(1) {
      width: 90rpx;
      height: 128rpx;
      border-radius: 8rpx;
      margin-right: 24rpx;

      > image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8rpx;
      }
    }

    > view:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}

.orderFormDetail {
  margin-top: 32rpx;
  background-color: #FFFFFF;
  padding: 30rpx;
  font-family: PingFang SC Bold;
  font-weight: normal;
  font-size: 28rpx;

  > view {
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid rgba(250, 250, 250, 1);
  }
}
</style>
