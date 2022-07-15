<template>
  <view class="content">
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        选择联赛
      </div>
      <button class="blue-btn ma-0" @click="onAdd">新增联赛</button>
    </div>
    <div v-if="list.length > 0">
      <uni-card
        v-for="(item, i) in list"
        :key="i"
        :thumbnail="item.leagueLogo"
        :title="item.leagueName"
        :extra="item.leagueArea"
        mode="style"
        is-shadow
      >
        <!-- class="stadium-card" -->
        <text>{{ item.leagueNote }}</text>
        <template #actions>
          <view class="card-actions">
            <view> <uni-icons type="eye" color="#2979ff"></uni-icons> 查看 </view>
            <view v-if="checkManage(item.createdBy)" @click="onEdit(item)">
              <uni-icons type="compose" color="#2979ff"></uni-icons> 修改
            </view>
            <view v-if="checkManage(item.createdBy)" class="c-red" @click="onDelete(item)">
              <uni-icons type="trash" color="#f38181"></uni-icons> 删除
            </view>
          </view>
        </template>
      </uni-card>
    </div>
    <div v-else class="no-data"></div>
  </view>
</template>

<script setup lang="ts">
import { IObj } from '@/types/common'
import { onMounted, ref } from 'vue'
const uniObject = uniCloud.importObject('league')
let list = ref<IObj>({})
const initData = async () => {
  const res = await uniObject.list()
  list.value = res.data
}
onMounted(async () => {
  initData()
})

const userInfo = uni.getStorageSync('userInfo')
const checkManage = (val) => {
  return userInfo._id === val
}

const onAdd = () => {
  uni.navigateTo({ url: `/pages/league/leagueForm` })
}
const onEdit = (val) => {
  uni.navigateTo({ url: `/pages/league/leagueForm?data=${JSON.stringify(val)}` })
}
const onDelete = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定删除 ${val.leagueName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await uniObject.delete(val._id)
        if (res.errCode === 0) {
          uni.showToast({ title: '请求成功', icon: 'none' })
          initData()
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
        }
      }
    },
  })
}
</script>

<style lang="scss" scoped></style>
