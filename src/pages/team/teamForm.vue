<template>
  <view class="content">
    <uni-card :title="formTitle" mode="style" is-shadow class="ma-10">
      <uni-forms ref="form" :model-value="formData" :rules="rules">
        <uni-forms-item required label="球队名称" name="teamName">
          <uni-easyinput v-model="formData.teamName" type="text" maxlength="20" />
        </uni-forms-item>
        <uni-forms-item label="球队说明" name="teamNote">
          <uni-easyinput v-model="formData.teamNote" type="text" maxlength="100" />
        </uni-forms-item>
        <uni-forms-item required label="所属联赛" name="leagueId">
          <uni-data-checkbox
            v-model="formData.leagueIds"
            multiple
            min="1"
            mode="list"
            :localdata="leagueList"
          ></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item required label="所属地区" name="teamArea">
          <uni-easyinput v-model="formData.teamArea" type="text" disabled />
        </uni-forms-item>
        <uni-forms-item label="球队图标" name="teamLogo">
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
const uniObject = uniCloud.importObject('team')
const league = uniCloud.importObject('league')
let joinedLeagues: string[] = []
interface IForm {
  _id?: string
  teamName: string
  teamNote: string
  teamArea: string
  teamLogo: string
  createdBy: string
  leagueIds: string[]
}
const initData = {
  teamName: '',
  teamNote: '',
  teamArea: '',
  teamLogo: '',
  createdBy: '',
  leagueIds: [],
}
let formTitle = ref<string>('')
let logoList = ref<IObj[]>([])
const form = ref()
let formData = ref<IForm>(initData)
const rules = {
  teamName: required,
  teamArea: required,
  leagueIds: required,
}
const initForm = (data?: IForm) => {
  if (!data) {
    formTitle.value = '新增球队'
    formData.value = initData
    logoList.value = []
  } else {
    formTitle.value = '修改球队'
    formData.value = data
    logoList.value = [
      {
        path: data.teamLogo,
        url: data.teamLogo,
      },
    ]
    joinedLeagues = data.leagueIds
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
  getLeagues()
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
  formData.value.teamArea = res.regeocode.addressComponent.province + res.regeocode.addressComponent.city
}

// 上传图片
const onSuccess = (val: IObj) => {
  formData.value.teamLogo = val.tempFilePaths[0]
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

// 获取联赛数据
let leagueList = ref<IObj>({})
const getLeagues = async () => {
  const res = await league.list()
  leagueList.value = res.data.map((v) => {
    return {
      text: v.leagueName,
      value: v._id,
    }
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
        const teamId = (res.data && res.data.id) || formData.value._id
        await saveLeagueTeam(teamId)
        uni.redirectTo({ url: `/pages/team/index` })
      } else {
        uni.showToast({ title: '请求失败', icon: 'none' })
      }
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}

// 保存联赛球队关系
const saveLeagueTeam = (teamId) => {
  return new Promise((resolve, reject) => {
    const addList = formData.value.leagueIds.filter((v) => !joinedLeagues.includes(v))
    if (addList.length > 0) {
      uniObject
        .joinLeague({
          teamId,
          list: addList,
        })
        .then((res: IResponse) => {
          if (res.errCode !== 0) {
            uni.showToast({ title: '请求失败', icon: 'none' })
            reject()
          }
        })
    }
    const delList = joinedLeagues.filter((v) => !formData.value.leagueIds.includes(v))
    if (delList.length > 0) {
      uniObject
        .quitLeague({
          teamId,
          list: delList,
        })
        .then((res: IResponse) => {
          if (res.errCode !== 0) {
            uni.showToast({ title: '请求失败', icon: 'none' })
            reject()
          }
        })
    }
    resolve(null)
  })
}
</script>

<style lang="scss" scoped></style>
