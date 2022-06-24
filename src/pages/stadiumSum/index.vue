<template>
  <view class="content">
    <div class="total-title">
      <uni-icons type="circle-filled" size="20" color="#1296db"></uni-icons>
      球场汇总
    </div>
    <uni-card title="省体育中心" extra="十一人制" mode="style" is-shadow :cover="cover">
      <text>五四路，北二环</text>
      <template #actions>
        <view class="flex-between">
          <view>
            <uni-icons type="navigate" size="20"></uni-icons>
            <span class="middle">导航</span>
          </view>
          <view>
            <uni-icons type="map-pin-ellipse" size="20"></uni-icons>
            <span class="middle">详情</span>
          </view>
        </view>
      </template>
    </uni-card>
    <uni-card title="奥体中心内场" extra="十一人制" mode="style" is-shadow :cover="cover">
      <text>(11人制) 榕超联赛由2个组别, 共20个球队组成. </text>
    </uni-card>
    <uni-card title="五孔闸球场" extra="八人制" mode="style" is-shadow :cover="cover">
      <text>(7人制) 仓丁联赛由1个组别, 共9个球队组成. </text>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cover = ref('https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg')
</script>

<style lang="scss" scoped></style>
