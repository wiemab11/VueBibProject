
<template>
  <!--
       Navbar.vue — Dynamic Navigation Bar -->
  <nav class="navbar">
    <div class="container nav-inner">
      <!-- 🌸 Brand Logo -->
      <router-link to="/" class="brand">
        <span class="brand-icon">🌸</span>
        <span class="brand-name">Book Store</span>
      </router-link>

      <div class="nav-links" :class="{ open: menuOpen }">

      <!-- c'est le lien Home qui est toujours affiché, que l'utilisateur soit connecté ou pas -->
        <router-link to="/" class="nav-link" @click="menuOpen = false">Home</router-link>
      <!-- si l'utilisateur n'est pas connecté, on affiche les liens Login et Register -->
        <!-- ── GUEST (not logged in) ── -->
        <template v-if="!isLoggedIn">
          <router-link to="/login"    class="nav-link" @click="menuOpen = false">Login</router-link>
          <router-link to="/register" class="nav-link btn btn-primary btn-sm" @click="menuOpen = false">Register</router-link>
        </template>
         
        <!-- ── LOGGED IN ── -->
        <template v-else>
          <router-link to="/books" class="nav-link" @click="menuOpen = false">Books</router-link>

          <template v-if="isOnAddBook">
            <router-link to="/books/add"   class="nav-link active-sub" @click="menuOpen = false">Add Book</router-link>
          </template>

      
          <template v-else>
            <router-link to="/favorites" class="nav-link" @click="menuOpen = false">❤️ Favorites</router-link>
          </template>

    
          <span class="nav-user">Hi, {{ currentUser?.username || currentUser?.name || 'User' }}!</span>
          <button class="btn btn-outline btn-sm" @click="handleLogout">Logout</button>
        </template>

      </div>
    </div>
  </nav>
</template>

<script>
import { authState } from '../main.js'

export default {
  name: 'Navbar',

  data() {
    return {
      menuOpen: false,
    }
  },
  computed: {
    isLoggedIn()    { return authState.isLoggedIn },
    currentUser()   { return authState.user },
    isOnAddBook()   { return this.$route.name === 'AddBook' },
  },
  methods: {
    handleLogout() {
      authState.logout()
      this.menuOpen = false
      this.$router.push('/login')
    },
  },
}

</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1.5px solid var(--border);
  height: 66px;
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
}

/* ── Brand ──────────────────────────────────────────────────── */
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  margin-right: auto;
}
.brand-icon { font-size: 1.4rem; }
.brand-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.02em;
}

/* ── Nav links ──────────────────────────────────────────────── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  padding: 8px 14px;
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--gray-600);
  transition: all 0.2s;
  text-decoration: none;
}
.nav-link:hover {
  color: var(--primary);
  background: var(--pink-50);
}
.nav-link.router-link-active {
  color: var(--primary);
  background: var(--pink-100);
  font-weight: 600;
}

/* رابط Add Book / Add Author وهو active */
.active-sub {
  color: var(--primary) !important;
  background: var(--pink-100) !important;
  font-weight: 600;
}

.nav-user {
  font-size: 0.88rem;
  color: var(--text-muted);
  padding: 0 8px;
  white-space: nowrap;
}

/* ── Hamburger (mobile) ─────────────────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--gray-800);
  border-radius: 2px;
  transition: all 0.2s;
}

/* ── Mobile ─────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .hamburger { display: flex; }

  .nav-links {
    display: none;
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--white);
    border-bottom: 1.5px solid var(--border);
    padding: 16px 24px;
    gap: 8px;
    box-shadow: var(--shadow-md);
  }
  .nav-links.open { display: flex; }

  .nav-link { width: 100%; }
}
</style>