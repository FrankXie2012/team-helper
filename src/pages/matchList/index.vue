<template>
  <view class="content">
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        选择联赛
      </div>
      <uni-tag type="primary" text="新增联赛" @click="onAdd"></uni-tag>
    </div>
    <uni-card
      v-for="(item, i) in list"
      :key="i"
      :title="item.leagueName"
      :extra="item.leagueArea"
      mode="style"
      is-shadow
      class="stadium-card"
    >
      <text>{{ item.leagueNote }}</text>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { IObj } from '@/types/common'
import { onMounted, ref } from 'vue'
let list = ref<IObj>({})
onMounted(async () => {
  const league = uniCloud.importObject('league')
  const res = await league.list()
  list.value = res.data
})

const onAdd = () => {
  uni.navigateTo({ url: `/pages/matchList/leagueForm` })
}
</script>

<style lang="scss" scoped></style>
