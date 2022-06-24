<template>
  <view class="content">
    <div class="total-title">
      <uni-icons type="circle-filled" size="20" color="#1296db"></uni-icons>
      选择联赛
    </div>
    <uni-card title="榕超联赛" extra="大体中心" mode="style" is-shadow :cover="cover">
      <text>(11人制) 榕超联赛由4个组别, 共42个球队组成. </text>
    </uni-card>
    <uni-card title="FAFA联赛" extra="奥体外场" mode="style" is-shadow :cover="cover">
      <text>(11人制) 榕超联赛由2个组别, 共20个球队组成. </text>
    </uni-card>
    <uni-card title="仓丁联赛" extra="金丰体育中心" mode="style" is-shadow :cover="cover">
      <text>(7人制) 仓丁联赛由1个组别, 共9个球队组成. </text>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cover = ref('https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg')
</script>

<style lang="scss" scoped></style>
