<template>
  <div>
    <h1>直播界面</h1>
    <live-item></live-item>
    <router-view></router-view>
  </div>
</template>

<script>
import liveItem from '@/components/liveItem'
export default {
  name: 'live',
  components: { liveItem }
}
</script>

<style scoped>

</style>
