// ============================================================
// main.js — App Entry Point
// ============================================================
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles.css'

// ── Global Auth State ─────────────────────────────────────────
// This reactive object is shared across all components via
// app.config.globalProperties.$auth
// In a larger app, replace this with Pinia or Vuex store.
export const authState = reactive({
  user: JSON.parse(localStorage.getItem('bs_current_user') || 'null'),

  login(user) {
    this.user = user
    localStorage.setItem('bs_current_user', JSON.stringify(user))
  },

  logout() {
    this.user = null
    localStorage.removeItem('bs_current_user')
  },

  get isLoggedIn() {
    return !!this.user
  },
})

const app = createApp(App)

// Make auth state available to all components as this.$auth
app.config.globalProperties.$auth = authState

app.use(router)
app.mount('#app')