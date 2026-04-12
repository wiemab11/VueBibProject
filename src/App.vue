<template>
  <component :is="currentNavbar" />
  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'

const route = useRoute()

const currentNavbar = computed(() => {
  if (route.path === '/'||route.path === '/login' || route.path === '/register') {
    return Navbar
  } else if (route.path === '/'||route.path === '/books'|| route.path === '/add-book') {
    return Navbar2
  } else if (route.path === '/'||route.path === '/Authors'||route.path === '/favourites') {
    return Navbar1
  }
})
</script>