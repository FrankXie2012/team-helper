<template>
  <view class="content">
    <uni-card :title="formTitle" mode="style" is-shadow class="ma-10">
      <uni-forms ref="form" :model-value="formData" :rules="rules">
        <uni-forms-item label="球员头像" name="playerAvatar">
          <img class="image-100" :src="formData.playerAvatar" />
        </uni-forms-item>
        <uni-forms-item required label="球员姓名" name="playerName">
          <uni-easyinput v-model="formData.playerName" type="text" maxlength="20" />
        </uni-forms-item>
        <uni-forms-item required label="球员外号" name="playerNickname">
          <uni-easyinput v-model="formData.playerNickname" type="text" maxlength="20" />
        </uni-forms-item>
        <uni-forms-item required label="性别" name="playerGender">
          <uni-data-checkbox v-model="formData.playerGender" :localdata="genderList"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item required label="手机号" name="playerPhone">
          <uni-easyinput v-model="formData.playerPhone" type="text" maxlength="100" />
        </uni-forms-item>
        <uni-forms-item required label="住址" name="playerAddr">
          <uni-easyinput
            v-model="formData.playerAddr"
            type="text"
            suffix-icon="map-pin-ellipse"
            disabled
            @icon-click="getLocation"
          />
        </uni-forms-item>
        <uni-forms-item required label="球衣号码" name="playerNumber">
          <uni-easyinput v-model="formData.playerNumber" type="text" maxlength="100" />
        </uni-forms-item>
        <uni-forms-item required label="惯用脚" name="playerFoot">
          <uni-data-checkbox v-model="formData.playerFoot" :localdata="footList"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item required label="场上位置" name="playerPosition">
          <uni-data-checkbox
            v-model="formData.playerPosition"
            multiple
            min="1"
            max="3"
            mode="list"
            :localdata="positionList"
          ></uni-data-checkbox>
        </uni-forms-item>
      </uni-forms>
      <button class="blue-btn" @click="onSubmit">确定</button>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { IResponse } from '@/types/common'
import { required } from '@/utils/common'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 初始化数据
const uniObject = uniCloud.importObject('player')
interface IForm {
  _id?: string
  wxOpenId: string
  playerName: string
  playerAvatar: string
  playerNickname: string
  playerGender: string
  playerPhone: string
  playerAddr: string
  playerNumber: number
  playerFoot: string
  playerPosition: string[]
}
const initData = {
  wxOpenId: '',
  playerName: '',
  playerAvatar: '',
  playerNickname: '',
  playerGender: '',
  playerPhone: '',
  playerAddr: '',
  playerNumber: 0,
  playerFoot: '',
  playerPosition: [],
}
let formTitle = ref<string>('')
const form = ref()
let formData = ref<IForm>(initData)
const rules = {
  playerName: required,
  playerNickname: required,
  playerGender: required,
  playerPhone: required,
  playerAddr: required,
  playerNumber: required,
  playerFoot: required,
  playerPosition: required,
}
const genderList = [
  { text: '男', value: 'male' },
  { text: '女', value: 'female' },
]
const footList = [
  { text: '左脚', value: 'left' },
  { text: '右脚', value: 'right' },
]
const positionList = [
  { text: '门将', value: 'GK' },
  { text: '左边后卫', value: 'LB' },
  { text: '右边后卫', value: 'RB' },
  { text: '中后卫', value: 'CB' },
  { text: '后腰', value: 'CDM' },
  { text: '组织型中场', value: 'CM' },
  { text: '前腰', value: 'CAM' },
  { text: '左边前', value: 'LM' },
  { text: '右边前', value: 'RM' },
  { text: '中锋', value: 'CF' },
  { text: '影锋', value: 'SS' },
  { text: '左边锋', value: 'LWF' },
  { text: '右边锋', value: 'RWF' },
]
const initForm = (data?: IForm) => {
  if (!data) {
    formTitle.value = '新增球员'
    formData.value = initData
  } else {
    formTitle.value = '修改球员'
    formData.value = data
  }
}

onLoad((option) => {
  if (option.data) {
    const param = JSON.parse(option.data)
    initForm(param)
  } else {
    initForm()
  }
})

// 通过地图获取位置
const getLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    geocode: true,
    success: (res) => {
      uni.chooseLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        success: (res) => {
          formData.value.playerAddr = res.name || res.address
        },
      })
    },
  })
}

// 提交表单
const onSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      let res: IResponse
      if (!formData.value._id) {
        res = await uniObject.add(formData.value)
      } else {
        res = await uniObject.update(formData.value)
      }
      if (res.errCode === 0 && res.data) {
        uni.setStorageSync(
          'userInfo',
          Object.assign({}, formData.value, {
            _id: res.data.id,
          })
        )
        uni.navigateBack({ delta: 1 })
      } else {
        uni.showToast({ title: '请求失败', icon: 'none' })
      }
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}
</script>

<style lang="scss" scoped></style>
