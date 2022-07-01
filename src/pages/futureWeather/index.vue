<template>
  <view class="content">
    <div class="total-title">
      <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
      我的位置
    </div>
    <uni-card class="total-card" title="当前位置" :extra="weather.city">
      {{ currentGeo.formatted_address }}
    </uni-card>
    <div class="total-title">
      <uni-icons type="circle-filled" size="20" color="#2979ff"></uni-icons>
      天气预报
    </div>
    <uni-card v-for="(item, i) in weather.casts" :key="i" mode="style" is-shadow :class="getCover(item.dayweather)">
      <div class="flex-between mb-10">
        <uni-tag :text="item.date" type="primary"></uni-tag>
        <view>更新日期: {{ weather.reporttime }}</view>
      </div>
      <uni-row>
        <uni-col :span="12">最高气温: {{ item.daytemp }}</uni-col>
        <uni-col :span="12">最低气温: {{ item.nighttemp }}</uni-col>
        <uni-col :span="12">白天天气: {{ item.dayweather }}</uni-col>
        <uni-col :span="12">晚上天气: {{ item.nightweather }}</uni-col>
        <uni-col :span="12">白天风向: {{ item.daywind }}</uni-col>
        <uni-col :span="12">晚上风向: {{ item.nightwind }}</uni-col>
        <uni-col :span="12">白天风力: {{ item.daypower }}</uni-col>
        <uni-col :span="12">晚上风力: {{ item.nightpower }}</uni-col>
      </uni-row>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '../../api/http'
import config from '../../config'
import { IObj } from '../../types/common'

onMounted(async () => {
  getLocation()
})

const getCover = (type: string) => {
  const covers = {
    晴: 'sunny-card',
    多云: 'cloudy-card',
    阴: 'moody-card',
    小雨: 'rainy-card',
    大雨: 'rainy-card',
  }
  return covers[type]
}

const getLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    geocode: true,
    success: function (res) {
      getGeo(res)
    },
  })
}

const currentGeo = ref<IObj>({})
const getGeo = async (location) => {
  const res = await http.get('https://restapi.amap.com/v3/geocode/regeo', {
    key: config.weatherKey,
    location: `${location.longitude},${location.latitude}`,
    extensions: 'all',
  })
  currentGeo.value = res.regeocode
  getWeather(res.regeocode.addressComponent.adcode)
}

const weather = ref<IObj>({})
const getWeather = async (code) => {
  const res = await http.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    key: config.weatherKey,
    city: code,
    extensions: 'all',
  })
  weather.value = res.forecasts[0]
}
</script>

<style lang="scss" scoped>
.sunny-card {
  :deep(.uni-card) {
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      url('https://images.pexels.com/photos/72473/pexels-photo-72473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: 100% 100%;
  }
}
.cloudy-card {
  :deep(.uni-card) {
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      url('https://images.pexels.com/photos/733832/pexels-photo-733832.jpeg?auto=compress&cs=tinysrgb&w=600');
    background-size: 100% 100%;
  }
}
.moody-card {
  :deep(.uni-card) {
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      url('https://images.pexels.com/photos/391522/pexels-photo-391522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: 100% 100%;
  }
}
.rainy-card {
  :deep(.uni-card) {
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      url('https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=600');
    background-size: 100% 100%;
  }
}
</style>
