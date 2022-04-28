<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { computed } from 'vue'
import { dotStyle } from '@/utils/dotStyle'

const props = defineProps<{
  data: CoreDot
}>()

const showText = computed(() => {
  let str = props.data.config.text
  if (!str) {
    return
  }
  return str.replaceAll('\n', '<br>')
})

const style = dotStyle(props.data)
</script>

<template>
  <div :style="style" v-html="showText"></div>
</template>

<style lang="less" scoped>
div {
  //background-color: rgba(255, 255, 255, .2);
  backdrop-filter: blur(10px);
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
