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
            param = result.userInfo
            uni.login({
              provider: 'weixin',
              success: async (loginRes) => {
                const loginResult = await uniObject.login({ code: loginRes.code })
                param.wxOpenId = loginResult.data.wxOpenId
                console.log(param)
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
