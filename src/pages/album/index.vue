<template>
 <view>
   专辑
   <VideoPlay></VideoPlay>
 </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import VideoPlay from './components/video/VideoPlay.vue'
import { albumService } from '@/pages/album/hooks/albumService'

onLoad((options)=>{
  albumService().getAblumWorkList(options.albumId as string)
})
</script>


<style scoped>

</style>
