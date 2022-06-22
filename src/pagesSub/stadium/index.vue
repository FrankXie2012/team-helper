<template>
  <view class="index">
    <text>{{ msg }}</text>
    <nut-icon name="dongdong"></nut-icon>

    <nut-button type="primary">主要按钮</nut-button>
    <nut-tabbar @tab-switch="tabSwitch">
      <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
      <nut-tabbar-item tab-title="分类" icon="category"></nut-tabbar-item>
      <nut-tabbar-item tab-title="发现" icon="find"></nut-tabbar-item>
      <nut-tabbar-item tab-title="购物车" icon="cart"></nut-tabbar-item>
      <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDidShow } from '@/hooks/life'

const msg = ref('Hello world')
useDidShow(() => {
  console.log('onShow')
})

const tabSwitch = (tab: string) => {
  console.log(tab)
}
</script>
