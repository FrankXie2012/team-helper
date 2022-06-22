<template>
  <nut-tabbar bottom @tab-switch="tabSwitch">
    <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="比赛" icon="category"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
const tabSwitch = (tab) => {
  switch (tab.tabTitle) {
    case '首页':
      Taro.navigateTo({ url: '/pages/index/index' })
      break
    case '比赛':
      Taro.navigateTo({ url: '/pages/match/index' })
      break
    case '我的':
      Taro.navigateTo({ url: '/pages/my/index' })
      break
    default:
      Taro.navigateTo({ url: '/pages/index/index' })
      break
  }
}
</script>

<style lang="scss" scoped></style>
