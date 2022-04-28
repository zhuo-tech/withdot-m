<script lang="ts" setup>
import { CoreDot, CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
import { dotStyle } from '@/utils/dotStyle'

const props = defineProps<{
  data: CoreDot
}>()

const style = dotStyle(props.data)
</script>

<template>
  <el-link :href="data.config.url" :style="style" target="_blank">{{ data.config.url }}</el-link>
</template>

<style scoped>

</style>
