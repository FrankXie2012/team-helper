<template>
  <view class="content">
    <uni-calendar insert lunar @change="onChange" />
  </view>
</template>

<script setup lang="ts">
const onChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
