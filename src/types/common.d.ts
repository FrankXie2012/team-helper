export declare interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

export declare type Nullable<T> = T | null
