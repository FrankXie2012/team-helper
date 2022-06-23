import { createSSRApp } from 'vue'
import { pinia } from './store/userStore'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
