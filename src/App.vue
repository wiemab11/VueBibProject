<template>
  <!-- Root application shell -->
  <div id="app-shell">
    <!-- Dynamic Navbar (changes based on auth state + route) -->
    <Navbar />
    
    <!-- Page transitions -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
//composant racine de l'application, qui inclut la barre de navigation et gère les transitions entre les pages
import Navbar from './components/NavBarDy.vue'

export default {
  name: 'App',
  components: { Navbar },
}
</script>

<style>
#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>