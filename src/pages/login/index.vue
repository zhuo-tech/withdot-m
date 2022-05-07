<script lang="ts" setup>
import { loginService } from '@/pages/login/hooks/loginService'

const {time, form, clearPhone, getCode, onsubmit} = loginService()
</script>

<template>
  <view class="box">
    <view class="top">
      <img alt="" src="../../static/login/loginBg.png" srcset="">
    </view>
    <view class="welcome">
      <view>登录</view>
      <view>欢迎再次回来~</view>
    </view>
    <view class="content">
      <van-form>
        <van-cell-group>
          <van-field
              v-model="form.phone"
              :clearable="true"
              :rules="[
            {required: true, message: '手机号不能为空'},
            {pattern: /^1[356789]\d{9}$/, message: '手机号格式有误!', trigger: 'blur'},
        ]"
              name="手机"
              placeholder="请输入手机号码"
              type="digit"
              @clear="clearPhone()">
            <template v-slot:left-icon>
              <img alt="" class="icon" src="../../static/login/phone.png" />
            </template>
          </van-field>
          <van-field
              v-model="form.code"
              :rules="[{ required: true, message: '验证码为空' }]"
              name="验证码"
              placeholder="请输入验证码"
              type="digit">
            <template v-slot:left-icon>
              <img alt="" class="icon" src="../../static/login/code.png" />
            </template>
            <template #button>
              <view v-if="time" class="timeCode">{{ time }}s</view>
              <van-button v-else class="bthCode" native-type="button" size="small" @click="getCode()">获取验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <view style="margin-top:40px">
          <van-button :class="form.phone && form.code ? '':'bth'" block native-type="submit" round type="primary" @click="onsubmit">
            登录
          </van-button>
        </view>
      </van-form>
    </view>
  </view>
</template>

<style lang="less" scoped>
.box {
  font-family: PingFang SC;
  font-size: 38rpx;

  .top {
    width: 100%;
    height: 308rpx;
    display: flex;
    justify-content: flex-end;
  }

  .welcome {
    margin-left: 72rpx;

    > view:nth-of-type(1) {
      color: rgba(47, 47, 47, 1);
      font-size: 64rpx;
      font-weight: Bold;

    }

    > view:nth-of-type(2) {
      color: rgba(137, 137, 137, 1);
    }
  }

  .content {
    margin: 182rpx 72rpx 0 72rpx;

    .van-field {
      height: 100rpx;
      background-color: #f5f5f5;
      border-radius: 50rpx;
      margin-bottom: 26rpx;
      position: relative;
    }

    .bthCode {
      position: absolute;
      top: -20rpx;
      right: -32rpx;
      height: 100rpx;
      color: #FFFFFF;
      width: 238rpx;
      background-color: rgba(13, 121, 255, 1);
      border-radius: 50rpx;
    }
  }

  .bth {
    width: 100%;
    border-radius: 50rpx;
    border: 0;
    background-color: #f5f5f5;
    color: #FFFFFF;
  }

}

:deep(.van-field__left-icon) {
  //display: flex;
  //justify-content: center;
  //align-items: center;

  .icon {
    width: 32rpx;
    height: 40rpx;
    object-fit: cover;
  }
}

.van-field__button {
  height: 92rpx;
}

:deep(.van-field-2-input) {
  font-size: 32rpx;
}

:deep(.van-field__control::-webkit-input-placeholder) {
  color: #666666;
  font-size: 24rpx;
  display: table-cell;
  vertical-align: middle;
}

.timeCode {
  position: absolute;
  top: -20rpx;
  right: -32rpx;
  height: 100rpx;
  color: rgba(13, 121, 255, 1);
  width: 238rpx;
  background-color: #d9e8f8;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
