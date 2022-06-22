import { createApp } from 'vue'
import { store } from '@/store'
import '@/assets/style/index.scss'
import '@nutui/nutui-taro/dist/style.css'
import { Button, Tabbar, TabbarItem, Icon } from '@nutui/nutui-taro'

const App = createApp({})

App.use(store)
App.use(Button).use(Tabbar).use(TabbarItem).use(Icon)

export default App
