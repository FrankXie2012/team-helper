<template>
  <view class="content">
    <uni-card :thumbnail="teamInfo.teamLogo" :title="teamInfo.teamName" is-full :extra="teamInfo.teamArea">
      <text>{{ teamInfo.teamNote }}</text>
    </uni-card>
    <br />
    <div v-if="checkManage(teamInfo.createdBy) && auditList.length > 0">
      <div class="total-title flex-between">
        <div>
          <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
          待审核球员
        </div>
      </div>
      <uni-card
        v-for="(item, i) in auditList"
        :key="i"
        :thumbnail="item.playerAvatar"
        :title="item.playerName"
        :sub-title="item.playerNickname"
        :extra="`${item.playerNumber}号`"
        mode="style"
        is-shadow
      >
        <uni-row>
          <uni-col :span="12">惯用脚: {{ item.playerFoot }}</uni-col>
          <uni-col :span="12">球员性别: {{ item.playerGender }}</uni-col>
          <uni-col :span="12">手机号: {{ item.playerPhone }}</uni-col>
          <uni-col :span="24">地址: {{ item.playerAddr }}</uni-col>
          <uni-col :span="24">场上位置: {{ item.playerPosition }}</uni-col>
        </uni-row>
        <template #actions>
          <view class="card-actions">
            <view @click="onPass(item)"> <uni-icons type="eye" color="#2979ff"></uni-icons> 通过 </view>
            <view class="c-red" @click="onDelete(item)">
              <uni-icons type="minus" color="#f38181"></uni-icons> 不通过
            </view>
          </view>
        </template>
      </uni-card>
    </div>
    <br />
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        球员列表
      </div>
    </div>
    <div v-if="playerList.length > 0">
      <uni-card
        v-for="(item, i) in playerList"
        :key="i"
        :thumbnail="item.playerAvatar"
        :title="item.playerName"
        :sub-title="item.playerNickname"
        :extra="`${item.playerNumber}号`"
        mode="style"
        is-shadow
      >
        <uni-row>
          <uni-col :span="12">惯用脚: {{ item.playerFoot }}</uni-col>
          <uni-col :span="12">球员性别: {{ item.playerGender }}</uni-col>
          <uni-col :span="12">手机号: {{ item.playerPhone }}</uni-col>
          <uni-col :span="24">地址: {{ item.playerAddr }}</uni-col>
          <uni-col :span="24">场上位置: {{ item.playerPosition }}</uni-col>
        </uni-row>
        <template #actions>
          <view class="card-actions">
            <view> <uni-icons type="eye" color="#2979ff"></uni-icons> 查看 </view>
            <view v-if="checkManage(item.createdBy)" class="c-red" @click="onDelete(item)">
              <uni-icons type="minus" color="#f38181"></uni-icons> 删除
            </view>
          </view>
        </template>
      </uni-card>
    </div>
    <div v-else class="no-data mt-10"></div>
  </view>
</template>

<script setup lang="ts">
import { IObj } from '@/types/common'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const uniObject = uniCloud.importObject('team')
const playerObject = uniCloud.importObject('player')
let teamInfo = ref<IObj>({})
onLoad((option) => {
  if (option.data) {
    console.log(option)
    const param = JSON.parse(option.data)
    teamInfo.value = param
    getAuditList()
    getPlayerList()
  }
})

// 判断是否球队管理员
const userInfo = uni.getStorageSync('userInfo')
const checkManage = (val) => {
  return userInfo._id === val
}

// 获取待审核球员
let auditList = ref<IObj[]>([])
const getAuditList = async () => {
  const res = await uniObject.getAuditList(teamInfo.value._id)
  auditList.value = res.data
}

// 获取球员列表
let playerList = ref<IObj[]>([])
const getPlayerList = async () => {
  const res = await uniObject.getPlayerList(teamInfo.value._id)
  playerList.value = res.data
}

// 同意加入
const onPass = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定统一球员 ${val.playerName} 加入球队 ${teamInfo.value.teamName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await playerObject.passJoin({
          teamId: teamInfo.value._id,
          playerId: val._id,
        })
        if (res.errCode === 0) {
          uni.showToast({ title: '请求成功', icon: 'none' })
          getAuditList()
          getPlayerList()
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
        }
      }
    },
  })
}

// 从球队中删除球员
const onDelete = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定从球队 ${teamInfo.value.teamName} 删除球员 ${val.playerName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await playerObject.quitTeam({
          teamId: teamInfo.value._id,
          playerId: val._id,
        })
        if (res.errCode === 0) {
          uni.showToast({ title: '请求成功', icon: 'none' })
          getAuditList()
          getPlayerList()
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
        }
      }
    },
  })
}
</script>

<style lang="scss" scoped></style>
