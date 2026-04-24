import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Books from '../views/Allbooks.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AddBook from '../views/AddBook.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Books',
    component: Books
  },
  {
    path: '/AddBook',
    component: AddBook
  },
  {
    path: '/Favorites',
    component: Favorites},
 
  {
    path: '/Login',
    component: Login
  },
{
  path: '/register',
  component: Register
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})
export default router