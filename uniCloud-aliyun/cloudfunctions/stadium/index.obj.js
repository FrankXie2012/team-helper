const db = uniCloud.database()
module.exports = {
  list: async () => {
    const collection = await db.collection('t_stadium').get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
  add: async (data = {}) => {
    if (!data) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db.collection('t_stadium').add(data)
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
    const res = await db.collection('t_stadium').doc(data._id).update(param)
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
    const res = await db.collection('t_stadium').doc(id).remove()
    return {
      errCode: 0,
      errMsg: '删除成功',
      data: res,
    }
  },
}
