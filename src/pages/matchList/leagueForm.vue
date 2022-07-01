<template>
  <view class="pa-20">
    <uni-forms :model-value="formData">
      <uni-forms-item required label="联赛名称" name="leagueName">
        <uni-easyinput v-model="formData.leagueName" type="text" />
      </uni-forms-item>
      <uni-forms-item label="联赛说明" name="leagueNote">
        <uni-easyinput v-model="formData.leagueNote" type="text" />
      </uni-forms-item>
      <uni-forms-item label="联赛图标" name="leagueLogo">
        <uni-file-picker
          v-model="formData.leagueLogo"
          file-mediatype="image"
          mode="grid"
          file-extname="png,jpg"
          :limit="1"
          @select="onSelect"
          @progress="onProgress"
          @success="onSuccess"
          @fail="onFail"
        />
      </uni-forms-item>
    </uni-forms>
    <button @click="onSubmit">确定</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IObj } from '@/types/common'

let formData = ref<IObj>({
  _id: '',
  leagueName: '',
  leagueNote: '',
  leagueArea: '',
  leagueLogo: '',
})

const onSelect = (val) => {
  console.log(val)
}
const onProgress = (val) => {
  console.log(val)
}
const onSuccess = (val) => {
  console.log(val)
}
const onFail = (val) => {
  console.log(val)
}
const onSubmit = async () => {}
</script>

<style lang="scss" scoped></style>
