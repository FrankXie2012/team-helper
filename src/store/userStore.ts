import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { User } from '../types/user'

type StateType = {
  user?: User
}
export default defineStore('global', {
  persist: {
    key: 'pinia',
    paths: ['user'],
  },
  state: (): StateType => ({
    user: undefined,
  }),
  actions: {
    setData<T extends keyof StateType>({ key, value }: { key: T; value: any }) {
      this[key] = value
    },
  },
})

export const pinia = createPinia().use(
  createPersistedState({
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value)
      },
    },
  })
)
