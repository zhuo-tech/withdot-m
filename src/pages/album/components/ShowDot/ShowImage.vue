<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { dotCogig } from '@/pages/album/components/ShowDot/dotCofig'
import { dotStyle } from '@/utils/dotStyle'
import { videoAddress } from '@/utils/video'

/**
 * 显示 coreDot config 中的 图片
 * @props data
 * @inject FileService
 */
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
  <img :src="videoAddress(data.config.url)" :style="style" alt="预览" class="show-image">
</template>

<style lang="less" scoped>
.show-image {
  object-fit: cover;
  position: absolute;
}
</style>
