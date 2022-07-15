<template>
  <view class="content">
    <uni-card :title="formTitle" mode="style" is-shadow class="ma-10">
      <uni-forms ref="form" :model-value="formData" :rules="rules">
        <uni-forms-item required label="联赛名称" name="leagueName">
          <uni-easyinput v-model="formData.leagueName" type="text" maxlength="20" />
        </uni-forms-item>
        <uni-forms-item label="联赛说明" name="leagueNote">
          <uni-easyinput v-model="formData.leagueNote" type="text" maxlength="100" />
        </uni-forms-item>
        <uni-forms-item required label="所属地区" name="leagueArea">
          <uni-easyinput v-model="formData.leagueArea" type="text" disabled />
        </uni-forms-item>
        <uni-forms-item label="联赛图标" name="leagueLogo">
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
import http from '../../api/http'
import config from '../../config'

// 初始化数据
const uniObject = uniCloud.importObject('league')
interface IForm {
  _id?: string
  leagueName: string
  leagueNote: string
  leagueArea: string
  leagueLogo: string
  createdBy: string
}
const initData = {
  leagueName: '',
  leagueNote: '',
  leagueArea: '',
  leagueLogo: '',
  createdBy: '',
}
let formTitle = ref<string>('')
let logoList = ref<IObj[]>([])
const form = ref()
let formData = ref<IForm>(initData)
const rules = {
  leagueName: required,
  leagueArea: required,
}
const initForm = (data?: IForm) => {
  if (!data) {
    formTitle.value = '新增联赛'
    formData.value = initData
    logoList.value = []
  } else {
    formTitle.value = '修改联赛'
    formData.value = data
    logoList.value = [
      {
        path: data.leagueLogo,
        url: data.leagueLogo,
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
  getLocation()
})

// 获取当前位置
const getLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    geocode: true,
    success: function (res) {
      getGeo(res)
    },
  })
}
const getGeo = async (location: IObj) => {
  const res = await http.get('https://restapi.amap.com/v3/geocode/regeo', {
    key: config.weatherKey,
    location: `${location.longitude},${location.latitude}`,
    extensions: 'all',
  })
  formData.value.leagueArea = res.regeocode.addressComponent.province + res.regeocode.addressComponent.city
}

// 上传图片
const onSuccess = (val: IObj) => {
  formData.value.leagueLogo = val.tempFilePaths[0]
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
        uni.redirectTo({ url: `/pages/league/index` })
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
