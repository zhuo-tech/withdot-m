<script lang="ts" setup>
import { ref } from 'vue'
import imgUrl from '@/static/树.png'

const orderFormList = ref([
  {imgUrl: imgUrl, name: 'UI技能必备动效果你好爱喝酒哈桑', price: '250'},
])

const toDetail = () => {
  uni.navigateTo({
    url: '/pages/my/orderForm/orderFormDetail',
  })
}
</script>

<template>
  <view class="box">
    <view v-for="(item,index) in orderFormList" :key="index" class="item" @click="toDetail()">
      <view>
        <image :src="item.imgUrl"></image>
      </view>
      <view>{{ item.name }}</view>
      <view>￥:{{ item.price }}</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
page {
  background-color: #f9f9f9;
}

.box {
  padding: 30rpx;
}

.item {
  height: 180rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: PingFang SC Bold;
  font-weight: Bold;
  padding: 30rpx;
  border-radius: 16rpx;

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
</style>
