
//point d'entrée de l'application Vue, où l'on crée l'instance de l'application, configure le routeur, et gère l'état global d'authentification de l'utilisateur
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles.css'



//fonction pour récupérer l'utilisateur stocké dans le localStorage
function getUserFromStorage() {
  try {
    const data = localStorage.getItem('bs_current_user')
    if (!data || data === 'undefined') return null
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}
//gere l'état de connexion de user , avec des méthodes pour se connecter, se déconnecter, et vérifier si l'utilisateur est connecté
export const authState = reactive({
  user: getUserFromStorage(),

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


// App setup


const app = createApp(App)

app.config.globalProperties.$auth = authState

app.use(router)
app.mount('#app')