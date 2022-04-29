<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { dotCogig } from '@/pages/album/components/ShowDot/dotCofig'
import { dotStyle } from '@/utils/dotStyle'

const props = defineProps<{
  data: CoreDot
}>()

const emits = defineEmits<{
  (event: 'videoStop'): void
  (event: 'videoPlay'): void
}>()

const style = dotStyle(props.data)

const toUrl = () => {
  window.open(props.data.config.url)
}

dotCogig(props.data, emits)
</script>

<template>
  <view :href="data.config.url" :style="style" target="_blank" @click="toUrl">{{ data.config.url }}</view>
</template>

<style scoped>

</style>
