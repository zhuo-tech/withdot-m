<template>
  <view>
    <view class="top">
      <van-cell-group inset style="border-radius: 100rpx">
        <van-field v-model="indexService.searchValue" left-icon="search" placeholder="搜索" />
      </van-cell-group>
      <image mode="aspectFill" src="../../static/树.png"></image>
    </view>
    <view class="content">
      <view class="album">
        <image class="cover" mode="aspectFill" src="../../static/树.png"></image>
        <view class="name">专辑名称</view>
        <view class="author">理光</view>
        <view class="tab">
          <span>标签|</span><span>345人已学</span>
        </view>
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

  >image {
    width: 670rpx;
    height: 300rpx;
    margin: 40rpx;
    border-radius: 16rpx;
  }
}

.content {
  .album {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 670rpx;
    height: 682rpx;
    margin: 20rpx 40rpx;
    background-image: url(../../static/zjbgi.png);
    background-size: 670rpx 682rpx;

    .cover {
      margin: 70rpx 0 0 0rpx;
      width: 260rpx;
      height: 370rpx;
    }

    .name {
      width: 200rpx;
      margin: 20rpx 0 0 0;
      font-size: 40rpx;
      text-align: center;
    }

    .author {
      width: 200rpx;
      margin: 20rpx 0 0 0;
      text-align: center;
      color: rgba(153, 153, 153, 1);
      font-size: 13px;
    }

    .tab {
      font-size: 12px;
      margin: 20rpx 0 0 0;
    }

  }
}
</style>