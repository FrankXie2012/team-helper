<template>
  <view class="content">
    <uni-card title="超德联赛" extra="八人制" mode="style" is-shadow class="stadium-card">
      <uni-list>
        <uni-list-item
          title="日期"
          :thumb="getThumb('calendar')"
          right-text="2022-06-30"
          show-arrow
          link
          to="/pages/soccerCalendar/index"
        ></uni-list-item>
        <uni-list-item title="时间" :thumb="getThumb('time')" right-text="20:30"></uni-list-item>
        <uni-list-item title="球衣" :thumb="getThumb('jersey')" right-text="红红红"></uni-list-item>
        <uni-list-item
          title="球场"
          :thumb="getThumb('field')"
          right-text="超德球场"
          show-arrow
          clickable
          @click="toStadium('超德球场')"
        ></uni-list-item>
        <uni-list-item
          title="对手"
          :thumb="getThumb('opponent')"
          right-text="海盗"
          show-arrow
          clickable
          @click="toTeam('海盗')"
        ></uni-list-item>
        <uni-list-item
          title="已报名"
          :thumb="getThumb('player')"
          right-text="12"
          show-arrow
          clickable
          @click="toTactic('id')"
        ></uni-list-item>
      </uni-list>
    </uni-card>
    <uni-list :border="true">
      <uni-list-chat
        avatar-circle
        title="静静"
        avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        note="后腰 / 边后卫"
        time="2022-02-02 20:20"
      ></uni-list-chat>
    </uni-list>
    <div class="flex-around mt-20">
      <uni-fav
        class="join-fav"
        bg-color-checked="#2979ff"
        :checked="joinCheck"
        :content-text="{ contentDefault: '参加', contentFav: '已参加' }"
        @click="checkJoin"
      />
      <uni-fav
        class="join-fav"
        bg-color-checked="#f38181"
        :checked="quitCheck"
        :content-text="{ contentDefault: '请假', contentFav: '已请假' }"
        @click="checkQuit"
      />
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import calendar from '@/static/calendar.png'
import time from '@/static/time.png'
import field from '@/static/field.png'
import opponent from '@/static/opponent.png'
import jersey from '@/static/jersey.png'
import player from '@/static/player.png'
const getThumb = (type) => {
  const thumbs = {
    calendar,
    time,
    field,
    opponent,
    jersey,
    player,
  }
  return thumbs[type]
}

const toStadium = (val) => {
  console.log(val)
}
const toTeam = (val) => {
  console.log(val)
}
const toTactic = (val) => {
  console.log(val)
}

const joinCheck = ref<boolean>(false)
const quitCheck = ref<boolean>(false)
const checkJoin = () => {
  joinCheck.value = !joinCheck.value
  quitCheck.value = false
}
const checkQuit = () => {
  joinCheck.value = false
  quitCheck.value = !quitCheck.value
}
</script>

<style lang="scss" scoped>
.join-fav {
  :deep(.uni-fav) {
    width: calc(45vw);
    height: 50px;
    text {
      font-size: 20px !important;
    }
  }
}
</style>
