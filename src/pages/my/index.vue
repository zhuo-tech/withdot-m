<template>
  <view class="box">
    <view class="top">
      <view class="avatar">
        <image src="@/static/my/avatar.png"></image>
      </view>
      <view class="name">154841212</view>
    </view>
    <view class="tabs">
      <view class="tabsItem">
        <view>
          <image src="@/static/my/orderForm.png"></image>
        </view>
        <view>我的订单</view>
      </view>
      <view class="tabsItem">
        <view>
          <image src="@/static/my/purchased.png"></image>
        </view>
        <view>已购专辑</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
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
  box-shadow: 0 0 8rpx rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-evenly;

  .tabsItem {
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 80rpx;
      height: 80rpx;
    }
  }

}
</style>
