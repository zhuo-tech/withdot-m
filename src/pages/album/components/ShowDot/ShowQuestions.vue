<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive, ref } from 'vue'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'

type AnswerType = {
  type: string,
  answer: []
}
const props = defineProps<{
  data: CoreDot
}>()

const formData: Record<number, any> = {}

const overlay = ref(true)

const emits = defineEmits(['videoStop', 'videoPlay', 'addParameters'])

const countdownTime = ref()

const visible = ref(true)

const numberOfCorrectAnswers = ref<number>(0)

//答题完成统计盒子 显示隐藏
const finishBox = ref(false)

props.data.config.exam.forEach((item: any, index: number) => {
  switch (item.type) {
    case QuestionTypeEnum.SAQ:
      formData[index] = {
        type: item.type,
        currentAnswer: '',
      }
      break
    case QuestionTypeEnum.XUANZE:
      let options: Record<number, any> = []
      item.content.forEach((item: any, index: number) => {
        options[index] = false
      })
      formData[index] = {
        type: item.type,
        currentAnswer: options,
      }
      break
    case QuestionTypeEnum.TIANKONG:
      let blank: Record<number, any> = []
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
  alearySumbit()
  visible.value = false
  let answer: any = []
  props.data.config.exam.forEach((item: any) => {
    let question: AnswerType = {
      type: item.type,
      answer: item.content,
    }
    answer.push(question)
  })

  answer?.forEach((item: any, index: number) => {
    switch (item.type) {
      case QuestionTypeEnum.TIANKONG:
        judgeFillInTheBlankQuestions(item, index)
        break
      case QuestionTypeEnum.XUANZE:
        judgmentMultipleChoice(item, index)
        break
      case QuestionTypeEnum.SAQ:
        judgeShortAnswerQuestions(item, index)
        break
      default:
    }
  })
  finishBox.value = true
}

//判断选择题是否正确
const judgmentMultipleChoice = (item: any, index: number) => {
  for (let i = 0; i < item.answer.length; i++) {
    if (item.answer[i].value !== form[index].currentAnswer[i]) {
      return
    }
  }
  addCount()
}

//判断填空题题是否正确

const judgeFillInTheBlankQuestions = (item: any, index: number) => {
  for (let i = 0; i < item.answer.length; i++) {
    if (item.answer[i].answer !== form[index].currentAnswer[i]) {
      return
    }
  }
  addCount()
}

//判断简答题是否正确
const judgeShortAnswerQuestions = (item: any, index: number) => {
  if (!form[index].currentAnswer) {
    return
  }
  addCount()
}

//如果答题正确 答对数量加1
const addCount = () => {
  if (numberOfCorrectAnswers.value >= props.data.config.exam) {
    return
  }
  numberOfCorrectAnswers.value++
}

const alearySumbit = () => {
  emits('addParameters', props.data._id)
}

const sureQuestion = () => {
  overlay.value = false
  finishBox.value = false
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

        <view v-if="item.type === QuestionTypeEnum.SAQ" class="answer">
          <view class="question">{{ item.label }}</view>
          <van-field v-model="form[index].currentAnswer" label="答案" placeholder="请填写简答题内容"></van-field>
        </view>
        <view v-if="item.type === QuestionTypeEnum.TIANKONG" class="answer">
          <view class="question">{{ item.label }}</view>
          <van-field v-for="(i,ind) in item.content"
                     :key="ind"
                     v-model="form[index].currentAnswer[ind]"
                     label="答案"
                     placeholder="请输入对应填空题内容"></van-field>
        </view>
        <view v-if="item.type === QuestionTypeEnum.XUANZE" class="answer">
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
  <view :class="finishBox ? 'finishQuestion':'closeBox'">
    <view class="top">
      <view>
        <img alt="" src="../../../../static/question/face.png" srcset="">
      </view>
      <view>恭喜你, 完成了考试</view>
    </view>
    <view class="main">
      <view>
        <view>{{ numberOfCorrectAnswers }}</view>
        <view>答对</view>
      </view>
      <view style="margin-left: 40rpx">
        <view>{{ data.config.exam.length - numberOfCorrectAnswers }}</view>
        <view>答错</view>
      </view>
    </view>
    <view class="questionBth" @click="sureQuestion">确定</view>
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
  color: rgba(47, 63, 90, 1);
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

.finishQuestion {
  background-color: #FFFFFF;
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500rpx;
  max-height: 50vh;
  pointer-events: auto;
  border-radius: 30rpx;
  z-index: 100;
  padding: 78rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    display: flex;
    align-items: center;
    justify-content: center;

    > view:nth-of-type(2) {
      margin-left: 20rpx;
    }
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: rgba(51, 51, 51, 1);
    font-size: 40rpx;
    margin-top: 40rpx;

    > view {
      > view:nth-of-type(1) {
        font-size: 56rpx;
        text-align: center;
      }
    }
  }

  .questionBth {
    width: 382rpx;
    height: 78rpx;
    border-radius: 50rpx;
    border: 1px solid #c3d7ff;
    color: #287dd9;
    font-size: 40rpx;
    margin-top: 40rpx;
    text-align: center;
    line-height: 78rpx;
  }
}

.answer {
  min-height: 30vh;
}
</style>
