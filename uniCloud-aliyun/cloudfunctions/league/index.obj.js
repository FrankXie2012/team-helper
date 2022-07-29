const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
  list: async () => {
    const collection = await db.collection('t_league').get()
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
    const res = await db.collection('t_league').add(data)
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
    const res = await db.collection('t_league').doc(data._id).update(param)
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
    await db.collection('t_league').doc(id).remove()
    await db
      .collection('t_league_team')
      .where({
        leagueId: id,
      })
      .remove()
    return {
      errCode: 0,
      errMsg: '删除成功',
    }
  },
  // 获取属于该联赛的所有球队
  getTeamList: async (id = '') => {
    if (!id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db
      .collection('t_league_team')
      .where({
        leagueId: id,
      })
      .get()
    const teamIds = res.data.map((v) => v.teamId)
    const collection = await db
      .collection('t_team')
      .where({
        _id: dbCmd.in(teamIds),
      })
      .get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
  // 一个联赛加入多只球队
  joinTeams: async (data = {}) => {
    if (!data || !data.leagueId || (data.list && data.list.length < 1)) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    for (const item of data.list) {
      await db.collection('t_league_team').add({ leagueId: data.leagueId, teamId: item })
    }
    return {
      errCode: 0,
      errMsg: '新增成功',
    }
  },
}
