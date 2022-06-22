export default defineAppConfig({
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  pages: ['pages/index/index', 'pages/my/index'],
  subpackages: [
    {
      root: 'pagesSub/stadium',
      pages: ['index']
    }
  ]
  // tabBar: {
  //   color: '#7A7E83',
  //   selectedColor: '#d81e06',
  //   borderStyle: 'black',
  //   backgroundColor: '#fff',
  //   list: [
  //     {
  //       pagePath: 'pages/index/index',
  //       iconPath: 'assets/icons/user_default.png',
  //       selectedIconPath: 'assets/icons/user_selected.png',
  //       text: '首页'
  //     },
  //     {
  //       pagePath: 'pages/find/index',
  //       iconPath: 'assets/icons/user_default.png',
  //       selectedIconPath: 'assets/icons/user_selected.png',
  //       text: '发现'
  //     },
  //     {
  //       pagePath: 'pages/my/index',
  //       iconPath: 'assets/icons/user_default.png',
  //       selectedIconPath: 'assets/icons/user_selected.png',
  //       text: '我的'
  //     }
  //   ]
  // }
})
