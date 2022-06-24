let baseURL = ''
/*
   baseURL可以根据环境变量来判断，改为
   let baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.5.202:8070' : '';
 */

//默认参数
let config = {
  baseURL: baseURL,
  header: {
    'content-type': 'application/json',
    token: uni.getStorageSync('token'), //根据自身情况是否添加token
  },
  method: 'POST',
  dataType: 'json',
  responseType: 'text',
  sslVerify: false, //是否验证ssl证书
}

//暴露设置token的方法
export function setToken(token) {
  uni.setStorageSync('token', token)
  config.header.token = token
}

/**
 *  拦截器
 * @param {*} options
 */
let Interceptor = (options) => {
  options.url = config.baseURL + options.url
  options.dataType = options.dataType || config.dataType
  options.data = {
    ...options.data,
    language: uni.getStorageSync('language') || 'zh-CN', //根据自身情况，是否后端需要多语言配置，不需要就删掉
  }
  options.header = { ...options.header, ...config.header }

  options.method = options.method || config.method
  options.sslVerify = options.sslVerify || config.sslVerify
  //如果传入loading为true,则显示loadding
  if (options.isloading) {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
  }
  return options
}

/**
 * 响应器
 * @param {*} res
 */
let Responder = (res) => {
  uni.hideLoading()
  if (res.data.code === '200' || res.data.status === '1') {
    return Promise.resolve(res.data)
  } else if (res.data.code === '302') {
    uni.reLaunch({
      url: '/pages/login/login',
    })
    return Promise.reject({ msg: '登录失效' })
  } else {
    return Promise.reject(res.data)
  }
}

/**
 * 请求
 *
 * */
let request = (options = {}) => {
  options = Interceptor(options)

  //发起请求
  return new Promise((resolve, reject) => {
    // 判断有无网络验证
    uni.getNetworkType({
      success(res) {
        if (res.networkType == 'none') {
          uni.showModal({
            title: '没有网络',
            content: '请检查您的网络',
            showCancel: false,
            success: () => {
              uni.hideLoading()
            },
          })
        } else {
          uni.request({
            ...options,
            success: (res) => {
              resolve(Responder(res))
            },
            fail: (err) => {
              reject(err)
            },
          })
        }
      },
    })
  })
}

export default {
  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return request(options)
  },
  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return request(options)
  },
}
