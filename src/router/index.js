import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Books from '../views/Allbooks.vue'
//import Authors from '../views/Authors.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AddBook from '@/views/AddBook.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/books',
    component: Books
  },
  {
    path: '/add-book',
    component: AddBook
  },
  //{
   // path: '/authors',
   // component: Authors}
  
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