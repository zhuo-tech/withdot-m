<script lang="ts" setup>

</script>

<template>
  <view class="box">
    <view class="item">
      <view>
        <image src="@/static/树.png"></image>
      </view>
      <view>清平乐,年年雪里</view>
      <view>立即观看</view>
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
</style>
