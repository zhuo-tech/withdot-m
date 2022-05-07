<template>
  <view>
    <view class="top">
      <van-cell-group inset style="border-radius: 100rpx">
        <van-field v-model="searchWord" left-icon="search" placeholder="搜索" @update:model-value="search" />
      </van-cell-group>
      <image mode="aspectFill" src="../../static/树.png"></image>
    </view>
    <view class="content">
      <view v-for="(item,index) in albumList" :key="index" class="album" @click="toAlbum(item._id)">
        <image :src="videoAddress(item.coverHref)" class="cover" lazy-load="true" mode="aspectFill"></image>
        <view class="name">{{ item.title }}</view>
        <view class="author">理光</view>
        <view class="tab">
          <span>标签|</span>
          <span>345人已学</span>
          s
        </view>
      </view>
    </view>
    <view v-show="noMore" class="noMore">没有更多啦!</view>
  </view>
</template>

<script lang="ts" setup>
import { useIndex } from '@/pages/index/hooks/useIndex'
import { videoAddress } from '@/utils/video'
import { debounce } from '@/utils/debounce'

const {albumList, getAlbumList, toAlbum, noMore, searchWord, getSearchAlbumList} = useIndex()

const search = () => {
  debounce(getSearchAlbumList, 1000)()
}
getAlbumList()
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 428rpx;
  background: linear-gradient(to top, #ffffff, #0D79FF);

  > image {
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
      object-fit: cover;
      border-radius: 16rpx;
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

.noMore {
  text-align: center;
  color: #5b5a5a;
  font-size: 28rpx;
  font-weight: Bolder;
  margin-bottom: 40rpx;
}
</style>
