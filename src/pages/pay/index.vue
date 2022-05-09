<script lang="ts" setup>
import { indexService } from '@/pages/pay/hooks/indxService'
import { videoAddress } from '@/utils/video'

const {albumDetail, phone, checked, pay} = indexService()
</script>

<template>
  <view class="box">
    <view class="currentPhone">
      <view>{{ phone }}</view>
      <view>当前账号</view>
    </view>
    <view class="detail">
      <view class="img">
        <img :src="videoAddress(albumDetail.coverHref)" alt="">
      </view>
      <view>
        <view class="title">{{ albumDetail.title }}</view>
        <view class="price">
          <span>￥</span>
          {{ albumDetail.sellingPrice }}
        </view>
      </view>
    </view>
    <view class="total">
      <view>
        <view>课程金额</view>
        <view>
          <span>￥</span>
          {{ albumDetail.sellingPrice }}
        </view>
      </view>
      <view>合计:
        <view class="price">
          <span>￥</span>
          {{ albumDetail.sellingPrice }}
        </view>
      </view>
    </view>
    <view class="pay">
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell clickable title="微信支付" @click="checked = '1'">
            <template #icon>
              <van-icon color="rgba(9, 187, 7, 1)" name="wechat-pay" size="20" />
            </template>
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </view>
    <view class="bth">
      <view>实付金额
        <span>￥{{ albumDetail.sellingPrice }}</span>
      </view>
      <view @click="pay">立即支付</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
page {
  background-color: #f9f9f9;
}

.box {
  padding: 40rpx;

  .currentPhone {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    width: 100%;
    height: 104rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > view:nth-of-type(1) {
      margin-left: 38rpx;
    }

    > view:nth-of-type(2) {
      margin-right: 38rpx;
      color: rgba(204, 204, 204, 1);
    }
  }

  .detail {
    margin-top: 40rpx;
    border-radius: 16rpx;
    background-color: #FFFFFF;
    height: 150rpx;
    padding: 40rpx;
    display: flex;
    justify-content: flex-start;

    .img {
      width: 90rpx;
      height: 100%;
      border-radius: 8rpx;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8rpx;
      }
    }

    > view:nth-of-type(2) {
      width: 432rpx;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: PingFang SC;
      font-weight: Bold;
      font-size: 36rpx;

      .title {
        margin-left: 32rpx;
        overflow: hidden;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .price {
        margin-left: 32rpx;
        color: red;

        > span {
          font-size: 24rpx;
        }
      }
    }
  }

  .total {
    background-color: #FFFFFF;
    margin-top: 40rpx;
    padding: 40rpx;
    height: 150rpx;

    > view:nth-of-type(1) {
      height: 50%;
      display: flex;
      justify-content: space-between;
      border-bottom: 4rpx #fcfcfc solid;
    }

    > view:nth-of-type(2) {
      height: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      .price {
        color: red;
      }
    }
  }

  .pay {
    border-radius: 16rpx;
    margin-top: 40rpx;
    height: 102rpx;
    background-color: #FFFFFF;

    :deep(.van-cell) {
      margin-top: 28rpx;
      align-items: center;
      padding: 0;
    }
  }
}

.bth {
  width: 100%;
  height: 120rpx;
  position: fixed;
  bottom: 0rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;

  > view:nth-of-type(1) {
    > span {
      color: rgba(231, 84, 84, 1);
    }
  }

  > view:nth-of-type(2) {
    width: 260rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 100rpx;
    color: #FFFFFF;
    background: linear-gradient(257.44deg, rgba(239, 86, 86, 1) 0%, rgba(252, 124, 124, 1) 100%);
  }
}
</style>
