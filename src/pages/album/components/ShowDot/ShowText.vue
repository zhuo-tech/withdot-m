<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { dotCogig } from '@/pages/album/components/ShowDot/dotCofig'
import { computed } from 'vue'
import { dotStyle } from '@/utils/dotStyle'

const props = defineProps<{
  data: CoreDot
}>()

const emits = defineEmits<{
  (event: 'videoStop'): void
  (event: 'videoPlay'): void
}>()

const showText = computed(() => {
  let str = props.data.config.text
  if (!str) {
    return
  }
  return str.replaceAll('\n', '<br>')
})

const style = dotStyle(props.data)

dotCogig(props.data, emits)
</script>

<template>
  <cover-view :style="style" v-html="showText"></cover-view>
</template>

<style lang="less" scoped>
cover-view {
  position: absolute;
  //backdrop-filter: blur(10px);
  padding: 5rpx 80rpx 5rpx 10rpx;
  border-radius: 3px;
  font-size: 24rpx;
}
</style>
