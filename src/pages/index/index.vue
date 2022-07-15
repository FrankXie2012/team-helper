<template>
  <view class="content">
    <uni-swiper-dot>
      <swiper class="swiper-box">
        <swiper-item>
          <img src="https://cdn.pixabay.com/photo/2016/03/27/20/57/people-1284253_960_720.jpg" />
        </swiper-item>
        <swiper-item>
          <img src="https://cdn.pixabay.com/photo/2015/09/09/17/18/stadium-931975_960_720.jpg" />
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <uni-grid :column="3" :show-border="false" square>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('league')">
          <uni-icons type="flag" size="50"></uni-icons>
          <h3>联赛管理</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('team')">
          <uni-icons type="star" size="50"></uni-icons>
          <h3>我的球队</h3>
        </div>
      </uni-grid-item>
      <uni-grid-item>
        <div class="grid-box" @click="onClickGrid('joinPost')">
          <uni-icons type="personadd" size="50"></uni-icons>
          <h3>参与接龙</h3>
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
import { wechatLogin } from '@/utils/common'
const onClickGrid = (val: string) => {
  wechatLogin()
  uni.navigateTo({ url: `/pages/${val}/index` })
}
onMounted(async () => {})
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
