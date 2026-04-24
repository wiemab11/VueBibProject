<template>

  <div class="page">
    <div class="container">

      <!-- ── Page Header ────────────────────────────────────────── -->
      <div class="page-header">
        <div>
          <h1>❤️ My Favorites</h1>
          <p class="subtitle">
            {{ favorites.length > 0 ? `${favorites.length} book${favorites.length > 1 ? 's' : ''} saved` : 'Your saved books will appear here' }}
          </p>
        </div>
        <router-link to="/books" class="btn btn-outline">Browse Catalog</router-link>
      </div>

      <!-- ── Loading ───────────────────────────────────────────── -->
      <div v-if="loading" class="loader">
        <div class="spinner"></div>
      </div>

      <!-- ── Empty State ────────────────────────────────────────── -->
      <div v-else-if="favorites.length === 0" class="empty-state">
        <span>🤍</span>
        <h3>No favorites yet</h3>
        <p>Go to the catalog and tap the heart icon on books you love!</p>
        <router-link to="/books" class="btn btn-primary">Explore Books</router-link>
      </div>

      <!-- ── Favorites Grid ─────────────────────────────────────── -->
      <div v-else class="books-grid">
        <div
          v-for="book in favorites"
          :key="book.id"
          class="book-card"
        >
          <!-- Cover -->
          <div class="book-cover">
            <img
              :src="book.image || defaultCover"
              :alt="book.title"
              @error="handleImgError"
            />
            <!-- Remove from favorites -->
            <button
              class="like-btn liked"
              @click="removeFromFavorites(book.id)"
              title="Remove from favorites"
            >
              ❤️
            </button>
          </div>

          <!-- Info -->
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-meta">{{ book.editor }} · {{ book.year }}</p>
            <p class="book-desc">{{ truncate(book.description, 90) }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
//pour afficher les livres favoris de l'utilisateur, et permettre de les retirer des favoris
import { getFavorites, toggleFavorite } from '../services/api.js'
import { authState } from '../main.js'

export default {
  name: 'Favorites',
  //pour stocker les données nécessaires à l'affichage des livres favoris
  data() {
    return {
      favorites: [],
      loading: true,
      defaultCover: 'https://via.placeholder.com/200x280/ffbdd8/f43f87?text=📖',
    }
  },
  //pour charger les livres favoris de l'utilisateur au moment où le composant est créé
  async created() {
    await this.loadData()
  },
  //pour les méthodes de l'affichage des livres favoris, et la gestion des favoris
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [favs,] = await Promise.all([
          getFavorites(authState.user.id),
        ])
        this.favorites = favs
      } finally {
        this.loading = false
      }
    },

    //pour retirer un livre des favoris de l'utilisateur, en envoyant la requête au backend et en mettant à jour la liste locale des favoris
    async removeFromFavorites(bookId) {
      await toggleFavorite(authState.user.id, bookId)
      // Remove from local list immediately
      this.favorites = this.favorites.filter(b => b.id !== bookId)
    },

    truncate(text, max) {
      if (!text) return ''
      return text.length > max ? text.slice(0, max) + '…' : text
    },

    handleImgError(e) {
      e.target.src = this.defaultCover
    },
  },
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
}
.page-header h1 { font-size: 2rem; }
.subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 4px;
}

/* Reuse same grid & card styles as AllBooks */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.book-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.25s;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--pink-300);
}

.book-cover {
  position: relative;
  height: 220px;
  background: var(--pink-50);
  overflow: hidden;
}
.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.book-card:hover .book-cover img { transform: scale(1.04); }

.like-btn {
  position: absolute;
  top: 10px; right: 10px;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}
.like-btn:hover { transform: scale(1.15); background: white; }

.book-info { padding: 16px; }
.book-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.book-author { font-size: 0.83rem; color: var(--primary); font-weight: 600; margin-bottom: 3px; }
.book-meta   { font-size: 0.78rem; color: var(--gray-400); margin-bottom: 8px; }
.book-desc   { font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; }

.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-state span { font-size: 4rem; display: block; margin-bottom: 16px; }
.empty-state h3   { margin-bottom: 8px; }
.empty-state p    { color: var(--text-muted); margin-bottom: 24px; }

@media (max-width: 640px) {
  .page-header { flex-direction: column; gap: 16px; align-items: flex-start; }
  .books-grid  { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
  .book-cover  { height: 180px; }
}
</style>