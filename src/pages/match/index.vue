<template>
  <view class="main">
    <text>{{ msg }}</text>
    <nut-icon name="dongdong"></nut-icon>
    <nut-button type="primary">主要按钮</nut-button>
  </view>
  <tab-bar></tab-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabBar from '@/components/tabbar.vue'
import { useDidShow } from '@/hooks/life'

const msg = ref('Hello world')
useDidShow(() => {
  console.log('onShow')
})
</script>
