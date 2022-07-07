export declare interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

export declare type Nullable<T> = T | null

// 云对象返回数据格式
export declare interface IResponse {
  errCode: 0 | 500
  errMsg: string
  data?: IObj
}
