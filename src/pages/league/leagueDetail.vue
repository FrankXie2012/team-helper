<template>
  <view class="content">
    <uni-card :thumbnail="leagueInfo.leagueLogo" :title="leagueInfo.leagueName" is-full :extra="leagueInfo.leagueArea">
      <text>{{ leagueInfo.leagueNote }}</text>
    </uni-card>
    <br />
    <div class="total-title flex-between">
      <div>
        <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
        球队列表
      </div>
      <button class="blue-btn ma-0" @click="onShow">加入联赛</button>
    </div>
    <div v-if="teamList.length > 0">
      <uni-card
        v-for="(item, i) in teamList"
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
            <view v-if="checkManage(item.createdBy)" class="c-red" @click="onQuit(item)">
              <uni-icons type="minus" color="#f38181"></uni-icons> 退出
            </view>
          </view>
        </template>
      </uni-card>
    </div>
    <div v-else class="no-data mt-10"></div>
    <uni-popup ref="popup">
      <div class="popup-box">
        <text class="mb-10">选择球队加入联赛</text>
        <div v-if="managedTeamList.length > 0" class="mt-10">
          <uni-data-checkbox
            v-model="joinTeamIds"
            multiple
            min="1"
            mode="list"
            :localdata="managedTeamList"
          ></uni-data-checkbox>
        </div>
        <div v-else class="no-data mt-10"></div>
        <button class="blue-btn mt-10" @click="onSubmit">确定</button>
      </div>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { IObj } from '@/types/common'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const uniObject = uniCloud.importObject('league')
const teamObject = uniCloud.importObject('team')
let leagueInfo = ref<IObj>({})
onLoad((option) => {
  if (option.data) {
    const param = JSON.parse(option.data)
    leagueInfo.value = param
    getTeamList()
  }
})

let teamList = ref<IObj[]>([])
const getTeamList = async () => {
  const res = await uniObject.getTeamList(leagueInfo.value._id)
  teamList.value = res.data
}

const userInfo = uni.getStorageSync('userInfo')
const checkManage = (val) => {
  return userInfo._id === val
}

let joinTeamIds = ref<string[]>([])
let managedTeamList = ref<IObj[]>([])
const getManagedTeams = async () => {
  const res = await teamObject.getManagedTeams(userInfo._id)
  const joinedTeamIds = teamList.value.map((v) => v._id)
  managedTeamList.value = res.data
    .filter((v: IObj) => !joinedTeamIds.includes(v._id))
    .map((v: IObj) => {
      return {
        text: v.teamName,
        value: v._id,
      }
    })
}
const popup = ref()
const onShow = () => {
  getManagedTeams()
  popup.value.open()
}
const onSubmit = async () => {
  if (joinTeamIds.value.length > 0) {
    await uniObject.joinTeams({
      leagueId: leagueInfo.value._id,
      list: joinTeamIds.value,
    })
    getTeamList()
    popup.value.close()
    joinTeamIds.value = []
  } else {
    uni.showToast({ title: '请选择球队', icon: 'none' })
  }
}

const onQuit = async (val) => {
  uni.showModal({
    title: '提示',
    content: `确定退出 ${leagueInfo.value.leagueName} 吗？`,
    success: async (show) => {
      uni.hideLoading()
      if (show.confirm) {
        const res = await teamObject.quitLeague({
          teamId: val._id,
          list: [leagueInfo.value._id],
        })
        if (res.errCode === 0) {
          uni.showToast({ title: '请求成功', icon: 'none' })
          getTeamList()
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
        }
      }
    },
  })
}
const onView = (val) => {
  uni.navigateTo({ url: `/pages/team/teamDetail?data=${JSON.stringify(val)}` })
}
</script>

<style lang="scss" scoped>
.popup-box {
  width: calc(80vw);
  background-color: $uni-bg-color;
  padding: 10px;
}
</style>
