<script lang="ts" setup>
import { CoreDot, CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
import { dotStyle } from '@/utils/dotStyle'
import { videoAddress } from '@/utils/video'
import { ref } from 'vue'

/**
 * 显示 coreDot config 中的 图片
 * @props data
 * @inject FileService
 */
const props = defineProps<{
  data: CoreDot
}>()

const style = dotStyle(props.data)
</script>

<template>
  <img :src="videoAddress(data.config.url)" :style="style" alt="预览" class="show-image">
</template>

<style lang="less" scoped>
.show-image {
  object-fit: cover;
  position: absolute;
}
</style>
