<template>
  <view class="content">
    <div class="user-card">
      <uni-card>
        <div class="user-card-inner">
          <img :src="userInfo.playerAvatar" class="image-100 image-round" />
          <div class="ma-10">{{ userInfo.playerName }}</div>
        </div>
        <uni-grid :column="3" :show-border="false" :square="false">
          <uni-grid-item class="text-center">
            <h3 class="font-bold">昵称</h3>
            {{ userInfo.playerNickname }}
          </uni-grid-item>
          <uni-grid-item class="text-center">
            <h3 class="font-bold">位置</h3>
            {{ userInfo.playerPosition.join(',') }}
          </uni-grid-item>
          <uni-grid-item class="text-center">
            <h3 class="font-bold">号码</h3>
            {{ userInfo.playerNumber }}
          </uni-grid-item>
        </uni-grid>
        <br />
      </uni-card>
    </div>
    <uni-list>
      <uni-list-item
        title="使用帮助"
        show-extra-icon
        :extra-icon="{ type: 'info' }"
        link
        @click="onHelp"
      ></uni-list-item>
      <uni-list-item
        title="修改个人资料"
        show-extra-icon
        :extra-icon="{ type: 'person' }"
        link
        @click="onEditUser"
      ></uni-list-item>
      <uni-list-item
        title="清空缓存"
        show-extra-icon
        :extra-icon="{ type: 'trash' }"
        link
        @click="onClearCache"
      ></uni-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IObj } from '@/types/common'
import { wechatLogin } from '@/utils/common'

onMounted(() => {
  wechatLogin()
})

const userInfo = ref<IObj>(uni.getStorageSync('userInfo'))
const onHelp = () => {
  uni.showToast({ title: '敬请期待' })
}
const onEditUser = () => {
  uni.navigateTo({ url: '/pages/player/playerForm?data=' + JSON.stringify(userInfo.value) })
}
const onClearCache = () => {
  uni.showModal({
    title: '温馨提示',
    content: '亲，确定清空缓存吗？',
    success(res) {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.showToast({
          title: '清空缓存成功',
        })
      }
    },
  })
}
</script>

<style lang="scss" scoped>
.user-card {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  padding: 40px;
}
.user-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 10px;
  font-size: 16px;
}
</style>
