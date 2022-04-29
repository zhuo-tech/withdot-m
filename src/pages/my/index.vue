<template>
  <view class="box">
    <view class="top">
      <view class="avatar">
        <image src="@/static/my/avatar.png"></image>
      </view>
      <view class="name">154841212</view>
    </view>
    <view class="tabs">
      <view v-for="(item,index) in tabsData" :key="index" class="tabsItem" @click="toPath(item.toPath)">
        <view>
          <image :src="item.imgUrl"></image>
        </view>
        <view>{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import orderImg from '@/static/my/orderForm.png'
import purchasedImg from '@/static/my/purchased.png'
import { ref } from 'vue'

const tabsData = ref([
  {imgUrl: orderImg, name: '我的订单', toPath: '/pages/my/orderForm/index'},
  {imgUrl: purchasedImg, name: '已购专辑', toPath: '/pages/my/album/index'},
])

const toPath = (path: string) => {
  uni.navigateTo({
    url: path,
  })
}

</script>

<style lang="less" scoped>

page {
  background-color: #fcfdff;
}

.box {
  background-color: #fcfdff;
}

.top {
  padding: 68rpx 40rpx;
  width: 100%;
  height: 272rpx;
  background: linear-gradient(to top, #ffffff, #0D79FF);
  display: flex;
  align-items: center;

  > .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;

    > image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > .name {
    margin-left: 32rpx;
    font-weight: Bold;
    font-size: 36rpx;
    color: rgba(51, 51, 51, 1);
    font-family: PingFang SC;
  }
}

.tabs {
  margin: 40rpx;
  width: 670rpx;
  border-radius: 16rpx;
  box-shadow: 0 0 8rpx #f8f8fa;
  display: flex;
  justify-content: space-evenly;
  background-color: #FFFFFF;

  .tabsItem {
    display: flex;
    height: 180rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    image {
      width: 80rpx;
      height: 80rpx;
    }
  }

}
</style>
