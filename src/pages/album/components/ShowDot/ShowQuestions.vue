<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive, ref } from 'vue'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'

const props = defineProps<{
  data: CoreDot
}>()

const formData: Record<number, any> = {}

const overlay = ref(true)

const emits = defineEmits(['videoStop', 'videoPlay'])

const countdownTime = ref()

const visible = ref(true)

props.data.config.exam.forEach((item: any, index: number) => {
  switch (item.type) {
    case QuestionTypeEnum.SAQ:
      formData[index] = {
        type: item.type,
        currentAnswer: '',
      }
      break
    case QuestionTypeEnum.XUANZE:
      let options: Record<number, any> = {}
      item.content.forEach((item: any, index: number) => {
        options[index] = false
      })
      formData[index] = {
        type: item.type,
        currentAnswer: options,
      }
      break
    case QuestionTypeEnum.TIANKONG:
      let blank: Record<number, any> = {}
      item.content.forEach((item: any, index: number) => {
        blank[index] = ''
      })
      formData[index] = {
        type: item.type,
        currentAnswer: blank,
      }
      break
    default:
      formData[index] = {type: 'default'}
  }
})

const currentQuestion = ref(0)

const nextQuestion = () => {
  if (props.data.config.exam.length >= (currentQuestion.value + 1)) {
    currentQuestion.value++
  }
}

const uponQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

const judgmentDot = () => {
  console.log(props.data.config, '打点参数')
  const {pause, time, switch: stopTime} = props.data.config
  pause ? emits('videoStop') : null
  if (stopTime) {
    time ? countdown(time) : null
  }
}

const countdown = (time: number) => {
  countdownTime.value = time
  const timer = setInterval(() => {
    countdownTime.value--
    if (countdownTime.value === 0) {
      clearInterval(timer)
      overlay.value = false
      visible.value = false
      emits('videoPlay')
    }
  }, 1000)
}

const submit = () => {

  overlay.value = false
  visible.value = false
  emits('videoPlay')
}

judgmentDot()

const form = reactive(formData)
</script>

<template>
  <van-overlay :show="overlay" />
  <view :class="visible? 'box showBox':'box closeBox'" :name="$attrs" @click.stop="()=>{}">
    <van-form ref="formRef" :model="form" label-width="40px">
      <view v-for="(item,index) in data.config.exam" v-show="currentQuestion === index" :key="index" style="min-height: 30vh">
        <view class="top">
          <view class="questionIndex">
            <view>{{ index + 1 }}</view>
            /
            <view>{{ data.config.exam.length }}</view>
          </view>
          <view v-if="data.config.switch">
            <van-icon name="clock-o" />
            <span>{{ countdownTime }}</span>
            秒
          </view>
        </view>

        <view v-if="item.type === QuestionTypeEnum.SAQ">
          <view class="question">{{ item.label }}</view>
          <van-field v-model="form[index].currentAnswer" label="答案" placeholder="请填写简答题内容"></van-field>
        </view>
        <view v-if="item.type === QuestionTypeEnum.TIANKONG">
          <view class="question">{{ item.label }}</view>
          <van-field v-for="(i,ind) in item.content"
                     :key="ind"
                     v-model="form[index].currentAnswer[ind]"
                     label="答案"
                     placeholder="请输入对应填空题内容"></van-field>
        </view>
        <view v-if="item.type === QuestionTypeEnum.XUANZE">
          <view class="question">{{ item.label }}</view>
          <van-field v-for="(i,ind) in item.content" :key="ind" name="checkBox">
            <template #input>
              <van-checkbox v-model="form[index].currentAnswer[ind]">{{ i.answer }}</van-checkbox>
            </template>
          </van-field>
        </view>
      </view>
      <van-row justify="end" type="flex">
        <view v-if="(currentQuestion+1) !== data.config.exam.length">
          <van-button v-if="currentQuestion !== 0"
                      class="button"
                      type="primary"
                      @click="uponQuestion">上一题
          </van-button>
          <van-button class="button"
                      type="primary"
                      @click="nextQuestion">下一题
          </van-button>
        </view>
        <view v-else>
          <van-button v-if="currentQuestion !== 0"
                      class="button"
                      type="primary"
                      @click="uponQuestion">上一题
          </van-button>
          <van-button class="button" type="primary" @click="submit">提交</van-button>
        </view>

      </van-row>

    </van-form>
  </view>
</template>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;

  > view:nth-of-type(2) {
    height: 60rpx;
    line-height: 60rpx;
    margin-right: 20rpx;
    color: rgba(13, 121, 255, 1);

    .van-icon {
      margin-right: 10rpx;
    }

    > span {
      margin-right: 10rpx;
    }
  }
}

.van-field {
  padding-left: 30rpx;
}

.questionIndex {
  display: flex;
  flex-direction: row;
  color: #FFFFFF;
  font-size: 32rpx;
  justify-content: center;
  background: linear-gradient(to top, #fbcb53, #fe943e);
  width: 100rpx;
  border-radius: 30rpx 0 30rpx 0;
  line-height: 60rpx;
  height: 60rpx;
  margin-bottom: 40rpx;

  > view:nth-of-type(1) {
    font-size: 32rpx;
  }

  > view:nth-of-type(2) {
    font-size: 24rpx;
  }
}

.box {
  background-color: #FFFFFF;
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500rpx;
  pointer-events: auto;
  border-radius: 30rpx;
  z-index: 100;
  min-height: 40vh;
}

.question {
  margin: 0 30rpx;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
  color: rgba(47, 63, 90, 1)
}

.button {
  width: 200rpx;
  margin: 30rpx 30rpx 30rpx 0;
  border-radius: 60rpx;
}

.showBox {
  display: block;
}

.closeBox {
  display: none;
}
</style>
