<template>
  <view class="content">
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        我的球队
      </div>
      <button class="blue-btn ma-0" @click="onAdd">新增球队</button>
    </div>
    <div v-if="list.length > 0">
      <uni-card
        v-for="(item, i) in list"
        :key="i"
        :thumbnail="item.teamLogo"
        :title="item.teamName"
        :extra="item.teamArea"
        mode="style"
        is-shadow
      >
        <text>{{ item.teamNote }}</text>
        <template #actions>
          <view class="card-actions">
            <view @click="onView(item)"> <uni-icons type="eye" color="#2979ff"></uni-icons> 查看 </view>
            <view v-if="checkManage(item.createdBy)" @click="onEdit(item)">
              <uni-icons type="compose" color="#2979ff"></uni-icons> 修改
            </view>
            <view v-if="checkManage(item.createdBy)" class="c-red" @click="onDelete(item)">
              <uni-icons type="trash" color="#f38181"></uni-icons> 删除
            </view>
            <view v-if="!checkManage(item.createdBy)" class="c-red" @click="onQuit(item)">
              <uni-icons type="minus" color="#f38181"></uni-icons> 退出
            </view>
          </view>
        </template>
      </uni-card>
    </div>
    <div v-else class="no-data"></div>
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        其他球队
      </div>
    </div>
    <div v-if="list.length > 0">
      <uni-card
        v-for="(item, i) in list"
        :key="i"
        :thumbnail="item.teamLogo"
        :title="item.teamName"
        :extra="item.teamArea"
        mode="style"
        is-shadow
      >
        <text>{{ item.teamNote }}</text>
        <template #actions>
          <view class="card-actions">
            <view @click="onView(item)"> <uni-icons type="eye" color="#2979ff"></uni-icons> 查看 </view>
            <view @click="onJoin(item)"> <uni-icons type="plus" color="#2979ff"></uni-icons> 加入 </view>
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
const uniObject = uniCloud.importObject('team')
const playerObject = uniCloud.importObject('player')
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

const onView = (val) => {
  console.log(val, JSON.stringify(val))
  uni.navigateTo({ url: `/pages/team/teamDetail?data=${JSON.stringify(val)}` })
}
const onAdd = () => {
  uni.navigateTo({ url: `/pages/team/teamForm` })
}
const onEdit = (val) => {
  uni.navigateTo({ url: `/pages/team/teamForm?data=${JSON.stringify(val)}` })
}
const onDelete = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定删除 ${val.teamName} 吗？`,
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
// 退出球队
const onQuit = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定退出 ${val.teamName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await playerObject.quitTeam({
          teamId: val._id,
          playerId: userInfo._id,
        })
        if (res.errCode === 0) {
          uni.showToast({ title: res.errMsg, icon: 'none' })
          initData()
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
        }
      }
    },
  })
}

// 申请加入球队
const onJoin = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定申请加入 ${val.teamName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await playerObject.joinTeam({
          teamId: val._id,
          playerId: userInfo._id,
        })
        if (res.errCode === 0) {
          uni.showToast({ title: res.errMsg, icon: 'none' })
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
