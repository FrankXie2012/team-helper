const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
  list: async () => {
    const collection = await db.collection('t_team').get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
  // 获取用户创建的所有球队
  getManagedTeams: async (id = '') => {
    if (!id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const collection = await db
      .collection('t_team')
      .where({
        createdBy: id,
      })
      .get()
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
    const res = await db.collection('t_team').add(data)
    await db.collection('t_team_player').add({ teamId: res.id, playerId: data.createdBy, auditStatus: true })
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
    const res = await db.collection('t_team').doc(data._id).update(param)
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
    await db.collection('t_team').doc(id).remove()
    await db
      .collection('t_league_team')
      .where({
        teamId: id,
      })
      .remove()
    await db
      .collection('t_team_player')
      .where({
        teamId: id,
      })
      .remove()
    return {
      errCode: 0,
      errMsg: '删除成功',
    }
  },
  // 一只球队加入多个联赛
  joinLeague: async (data = {}) => {
    if (!data || !data.teamId || (data.list && data.list.length < 1)) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    for (const item of data.list) {
      await db.collection('t_league_team').add({ teamId: data.teamId, leagueId: item })
    }
    return {
      errCode: 0,
      errMsg: '新增成功',
    }
  },
  // 一只球队退出多个联赛
  quitLeague: async (data = {}) => {
    if (!data || !data.teamId || (data.list && data.list.length < 1)) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    await db
      .collection('t_league_team')
      .where({
        teamId: data.teamId,
        leagueId: dbCmd.in(data.list),
      })
      .remove()
    return {
      errCode: 0,
      errMsg: '新增成功',
    }
  },
  // 获取通过审核的所有球员
  getPlayerList: async (id = '') => {
    if (!id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db
      .collection('t_team_player')
      .where({
        teamId: id,
        auditStatus: true,
      })
      .get()
    const playerIds = res.data.map((v) => v.playerId)
    const collection = await db
      .collection('t_player')
      .where({
        _id: dbCmd.in(playerIds),
      })
      .get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
  // 获取待审核的所有球员
  getAuditList: async (id = '') => {
    if (!id) {
      return {
        errCode: 500,
        errMsg: '操作失败',
      }
    }
    const res = await db
      .collection('t_team_player')
      .where({
        teamId: id,
        auditStatus: false,
      })
      .get()
    const playerIds = res.data.map((v) => v.playerId)
    const collection = await db
      .collection('t_player')
      .where({
        _id: dbCmd.in(playerIds),
      })
      .get()
    return {
      errCode: 0,
      errMsg: '获取成功',
      ...collection,
    }
  },
}
