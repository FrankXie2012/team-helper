export default {
  appId: 'wxa088dfa5f82bfb42', // 球队助手
  appSecret: '75d6a9092115cb21366d95d4cfe2b1c4', // 球队助手

  // Wechat serverless
  环境ID: 'prod-1gs19i7t201c2ef7',
  dbUser: 'root',
  dbPwd: 'w3Smd7vS',
  dbDomain: 'https://koa-2qrw-2018565-1257841605.ap-shanghai.run.tcloudbase.com'
}

// wx.cloud.callContainer({
//   config: {
//     env: 'prod-1gs19i7t201c2ef7'
//   },
//   path: '/api/count',
//   header: {
//     'X-WX-SERVICE': 'koa-2qrw'
//   },
//   method: 'POST',
//   data: {
//     action: 'inc'
//   }
// })
