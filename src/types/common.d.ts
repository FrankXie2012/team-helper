// https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html
declare interface PageConfig {
  navigationBarBackgroundColor?: string
  navigationBarTextStyle?: string
  navigationBarTitleText: string
  navigationStyle?: string
  backgroundColor?: string
  backgroundTextStyle?: 'dark' | 'light'
  backgroundColorTop?: string
  backgroundColorBottom?: string
  enablePullDownRefresh?: boolean
  onReachBottomDistance?: number
  pageOrientation?: 'auto' | 'portrait' | 'landscape'
  disableScroll?: boolean
  usingComponents?: Object
  initialRenderingCache?: 'static' | 'dynamic'
  style?: string
  singlePage?: Object
  restartStrategy?: string
}

// TODO 编译无法通过
declare interface IObj<T = unknown> {
  [key: string]: T
  [key: number]: T
}

declare type Nullable<T> = T | null
