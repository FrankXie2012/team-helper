<template>
  <view class="content">
    <uni-grid :column="3" :show-border="false" square>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('joinPost')">
          <uni-icons type="personadd" size="50"></uni-icons>
          <h3>参与接龙</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('myTeams')">
          <uni-icons type="star" size="50"></uni-icons>
          <h3>我的球队</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('matchList')">
          <uni-icons type="flag" size="50"></uni-icons>
          <h3>赛程赛况</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('soccerCalendar')">
          <uni-icons type="settings" size="50"></uni-icons>
          <h3>足球日历</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('futureWeather')">
          <uni-icons type="spinner-cycle" size="50"></uni-icons>
          <h3>未来天气</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('stadiumSum')">
          <uni-icons type="map-pin-ellipse" size="50"></uni-icons>
          <h3>球场汇总</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('mateDrive')">
          <uni-icons type="paperplane" size="50"></uni-icons>
          <h3>队友顺风车</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('teamTactic')">
          <uni-icons type="compose" size="50"></uni-icons>
          <h3>球队战术板</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('dataStat')">
          <uni-icons type="list" size="50"></uni-icons>
          <h3>数据统计</h3>
        </div>
      </uni-grid-item>
    </uni-grid>
    <div class="total-title">
      <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
      比赛计划
    </div>
    <uni-card title="基础卡片" extra="额外信息">
      <text>这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const onClickGrid = (val: string) => {
  uni.navigateTo({ url: `/pages/${val}/index` })
}
onMounted(async () => {
  // const team = uniCloud.importObject('team')
  // const res = await team.add()
})
</script>

<style lang="scss" scoped>
.grid-box {
  height: calc(33vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
