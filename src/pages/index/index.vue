<template>
  <view>
    <view class="top">
      <van-cell-group inset style="border-radius: 100rpx">
        <van-field v-model="indexService.searchValue" left-icon="search"  placeholder="搜索"/>
      </van-cell-group>
      <image src="../../static/树.png" mode="aspectFill"></image>
    </view>
    <view class="content">
      <view class="album">
          <image></image>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { indexService } from './hooks/indexService'

indexService().getAlbumList()
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 428rpx;
  background: linear-gradient(to top, #ffffff, #0D79FF);
  >image{
    width: 670rpx;
    height: 300rpx;
    margin: 40rpx;
    border-radius: 16rpx;
  }
}
.content{
  .album{
    width: 670rpx;
    height: 682rpx;
    margin: 20rpx 40rpx;
    background-color: red;
    >image{
      width: 260rpx;
      height: 370rpx;
    }
  }
}
</style>
