<template>
  <view class="content">
    <uni-card :title="formTitle" mode="style" is-shadow class="ma-10">
      <uni-forms ref="form" :model-value="formData" :rules="rules">
        <uni-forms-item required label="球场名称" name="stadiumName">
          <uni-easyinput v-model="formData.stadiumName" type="text" maxlength="20" />
        </uni-forms-item>
        <uni-forms-item label="球场草皮" name="stadiumGrass">
          <uni-data-checkbox v-model="formData.stadiumGrass" :localdata="grassList"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item required label="球场位置" name="stadiumGeo">
          <uni-easyinput
            v-model="formData.stadiumGeo"
            type="text"
            suffix-icon="map-pin-ellipse"
            disabled
            @icon-click="getLocation"
          />
        </uni-forms-item>
        <uni-forms-item label="球场图片" name="stadiumPic">
          <uni-file-picker
            v-model="logoList"
            file-mediatype="image"
            mode="grid"
            file-extname="png,jpg"
            :limit="1"
            @success="onSuccess"
            @fail="onFail"
          />
        </uni-forms-item>
      </uni-forms>
      <button class="blue-btn" @click="onSubmit">确定</button>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { IObj, IResponse } from '@/types/common'
import { required } from '@/utils/common'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 初始化数据
const uniObject = uniCloud.importObject('stadium')
interface IForm {
  _id?: string
  stadiumName: string
  stadiumGrass: string
  stadiumGeo: string
  stadiumLocation: string
  stadiumPic: string
  createdBy: string
}
const initData = {
  stadiumName: '',
  stadiumGrass: '',
  stadiumGeo: '',
  stadiumLocation: '',
  stadiumPic: '',
  createdBy: '',
}
const grassList = [
  { text: '人工草', value: 'artificial' },
  { text: '天然草', value: 'natural' },
]
let formTitle = ref<string>('')
let logoList = ref<IObj[]>([])
const form = ref()
let formData = ref<IForm>(initData)
const rules = {
  stadiumName: required,
  stadiumGrass: required,
  stadiumGeo: required,
}
const initForm = (data?: IForm) => {
  if (!data) {
    formTitle.value = '新增球场'
    formData.value = initData
    logoList.value = []
  } else {
    formTitle.value = '修改球场'
    formData.value = data
    logoList.value = [
      {
        path: data.stadiumPic,
        url: data.stadiumPic,
      },
    ]
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
          formData.value.stadiumGeo = res.name || res.address
          formData.value.stadiumLocation = res.longitude + ',' + res.latitude
        },
      })
    },
  })
}

// 上传图片
const onSuccess = (val: IObj) => {
  formData.value.stadiumPic = val.tempFilePaths[0]
}
const onFail = (val) => {
  console.error(val)
  uni.showModal({
    title: '提示',
    content: '上传失败，请重试',
    showCancel: false,
    success: () => {
      uni.hideLoading()
    },
  })
}

// 提交表单
const onSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      let res: IResponse
      formData.value.createdBy = uni.getStorageSync('userInfo')._id
      if (!formData.value._id) {
        res = await uniObject.add(formData.value)
      } else {
        res = await uniObject.update(formData.value)
      }
      if (res.errCode === 0) {
        uni.redirectTo({ url: `/pages/stadiumSum/index` })
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
