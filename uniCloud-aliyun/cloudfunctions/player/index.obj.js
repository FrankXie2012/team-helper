const config = {
  appId: 'wxa088dfa5f82bfb42', // 球队助手
  appSecret: '75d6a9092115cb21366d95d4cfe2b1c4', // 球队助手
}
const db = uniCloud.database()
module.exports = {
  login: async (data = {}) => {
    const { code } = data
    const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
    const requestOptions = {
      method: 'GET',
      dataType: 'json',
    }
    const res = await uniCloud.httpclient.request(URL, requestOptions)
    return {
      errCode: 0,
      errMsg: '登录成功',
      data: { wxOpenId: res.data.openid },
    }
  },
  list: async () => {
    const collection = await db.collection('t_player').get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
  getOne: async (data) => {
    const user = await db.collection('t_player').where(data).get()
    if (!user) {
      return {
        errCode: 500,
        errMsg: '查找失败',
      }
    } else {
      return {
        errCode: 0,
        errMsg: '查找成功',
        ...user,
      }
    }
  },
  add: async (data = {}) => {
    if (!data) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db.collection('t_player').add(data)
    return {
      errCode: 0,
      errMsg: '新增成功',
      data: res,
    }
  },
  update: async (data = {}) => {
    if (!data || !data._id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const param = Object.assign({}, data)
    delete param._id
    const res = await db.collection('t_player').doc(data._id).update(param)
    return {
      errCode: 0,
      errMsg: '修改成功',
      data: res,
    }
  },
  delete: async (id = '') => {
    if (!id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db.collection('t_player').doc(id).remove()
    return {
      errCode: 0,
      errMsg: '删除成功',
      data: res,
    }
  },
}
