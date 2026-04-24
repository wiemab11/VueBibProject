<template>
  <div class="page">
    <div class="container">
      <!-- ── Hero Section ─────────────────────────────────────── -->
      <section class="hero">
        <div class="hero-content slide-up-enter-active" style="animation: slideUp 0.6s ease both;">
          <p class="hero-eyebrow">🌸 Welcome to</p>
          <h1 class="hero-title">Your Favorite<br><em>Book Store</em></h1>
          <p class="hero-subtitle">
            Discover beautiful stories, curate your reading list, and fall in love
            with books all over again.
          </p>
          <div class="hero-actions">
            <router-link to="/books" class="btn btn-primary btn-lg">
              📚 Explore the Catalog
            </router-link>
            <router-link v-if="!isLoggedIn" to="/register" class="btn btn-outline btn-lg">
              Create Account
            </router-link>
          </div>
        </div>

        <!-- Decorative blobs -->
        <div class="hero-decoration" aria-hidden="true">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          <div class="book-stack">
            <div class="book b1">Pride & Prejudice</div>
            <div class="book b2">One Hundred Years</div>
            <div class="book b3">Norwegian Wood</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
//pour gérer l'affichage de la page d'accueil en fonction de l'état de connexion de l'utilisateur
import { authState } from '../main.js'

export default {
  name: 'Home',
  computed: {
    isLoggedIn() { return authState.isLoggedIn },
  },
}
</script>

<style scoped>
/* ── Hero ───────────────────────────────────────────────────── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 60px 0 80px;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow {
  font-size: 1rem;
  color: var(--primary);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: var(--gray-900);
  margin-bottom: 20px;
}
.hero-title em {
  color: var(--primary);
  font-style: italic;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 460px;
  margin-bottom: 36px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* ── Decoration ─────────────────────────────────────────────── */
.hero-decoration {
  position: relative;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
}
.blob-1 {
  width: 300px; height: 300px;
  background: var(--pink-300);
  top: -20px; right: 0;
  animation: float 6s ease-in-out infinite;
}
.blob-2 {
  width: 220px; height: 220px;
  background: var(--pink-200);
  bottom: 0; left: 20px;
  animation: float 8s ease-in-out infinite reverse;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

/* Book stack illustration */
.book-stack {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: rotate(-3deg);
}
.book {
  padding: 20px 32px;
  border-radius: 6px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--white);
  box-shadow: var(--shadow-lg);
  letter-spacing: 0.01em;
}
.b1 { background: var(--pink-500); transform: rotate(2deg); }
.b2 { background: var(--pink-700); transform: rotate(-1deg); width: 200px; }
.b3 { background: var(--pink-400); transform: rotate(3deg); width: 180px; }



/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 0 60px;
    text-align: center;
  }
  .hero-decoration { height: 250px; }
  .hero-subtitle { margin: 0 auto 36px; }
  .hero-actions { justify-content: center; }
}
</style>