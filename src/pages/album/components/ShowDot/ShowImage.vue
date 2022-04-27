<script lang="ts" setup>
import { CoreDot, CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
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

const style = ref({
  left: props.data.position.x  * 750 + 'rpx',
  top: props.data.position.y * 410 + 'rpx',
  width: (props.data.position.width as number) * 750 + 'rpx',
  height:( props.data.position.width as number) * 410 + 'rpx',
})
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
