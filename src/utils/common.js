// 必填
export const required = {
  rules: [
    {
      required: true,
      errorMessage: '必填',
    },
  ],
}

// 登录
export const wechatLogin = () => {
  const userInfo = uni.getStorageSync('userInfo')
  if (userInfo && userInfo._id) {
    return
  }
  if (userInfo && userInfo.playerAvatar && !userInfo._id) {
    return uni.showModal({
      title: '温馨提示',
      content: '亲，请先完善用户资料',
      success() {
        uni.navigateTo({
          url: '/pages/player/playerForm?data=' + JSON.stringify(userInfo),
        })
      },
    })
  }
  const uniObject = uniCloud.importObject('player')
  let param = {}
  uni.showModal({
    title: '温馨提示',
    content: '亲，授权微信登录后才能正常使用小程序功能',
    success(res) {
      if (res.confirm) {
        uni.getUserProfile({
          desc: '注册用户信息使用',
          lang: 'zh_CN',
          success: (result) => {
            param = {
              playerAvatar: result.userInfo.avatarUrl,
              playerNickname: result.userInfo.nickName,
              playerGender: result.userInfo.gender ? 'female' : 'male',
            }
            uni.login({
              provider: 'weixin',
              success: async (loginRes) => {
                const loginResult = await uniObject.login({ code: loginRes.code })
                param.wxOpenId = loginResult.data.wxOpenId
                const userRes = await uniObject.getOne({ wxOpenId: param.wxOpenId })
                const user = userRes && userRes.data && userRes.data[0]
                uni.setStorageSync('userInfo', user)
                if (!user) {
                  uni.navigateTo({
                    url: '/pages/player/playerForm?data=' + JSON.stringify(param),
                  })
                } else {
                  uni.showToast({
                    title: '授权登录成功',
                    duration: 2000,
                  })
                }
              },
            })
          },
        })
      } else {
        uni.showToast({
          title: '您取消了授权',
          duration: 2000,
        })
      }
    },
  })
}
