module.exports = {
  add: function (title = '', content = '') {
    title = title.trim()
    content = content.trim()
    if (!title || !content) {
      return {
        errCode: 'INVALID_TODO',
        errMsg: 'TODO标题或内容不可为空',
      }
    }
    // ...其他逻辑，如操作todo数据表添加数据
    return {
      errCode: 0,
      errMsg: '创建成功',
    }
  },
}
