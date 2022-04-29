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

dotCogig(props.data, emits)
</script>

<template>
  <el-link :href="data.config.url" :style="style" target="_blank">{{ data.config.url }}</el-link>
</template>

<style scoped>

</style>
