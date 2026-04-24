<template>

  <div class="page">
    <div class="container">

      <!-- ── Page Header -->
      <div class="page-header">
        <div>
          <h1>📚 Book Catalog</h1>
          <p class="subtitle">{{ books.length }} books in the collection</p>
        </div>
        <router-link to="/AddBook" class="btn btn-primary">
          + Add Book
        </router-link>
      </div>

      <!-- ── Loading State -->
      <div v-if="loading" class="loader">
        <div class="spinner"></div>
      </div>

      
      <div v-else-if="books.length === 0" class="empty-state">
        <span>📭</span>
        <h3>No books yet</h3>
        <p>Be the first to add a book to the catalog!</p>
        <router-link to="/AddBook" class="btn btn-primary">Add First Book</router-link>
      </div>

      <!-- ── Books Grid -->
      <div v-else class="books-grid">
        <div
          v-for="book in books"
          :key="book.id"
          class="book-card"
        >
          <!-- Cover image -->
          <div class="book-cover">
            <img
              :src="book.image || defaultCover"
              :alt="book.title"
              @error="handleImgError"
            />
            <!-- Like button overlay -->
            <button
              class="like-btn"
              :class="{ liked: isFav(book.id) }"
              @click="toggleLike(book.id)"
              :title="isFav(book.id) ? 'Remove from favorites' : 'Add to favorites'"
            >
              {{ isFav(book.id) ? '❤️' : '🤍' }}
            </button>
          </div>

          
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
//pour afficher tous les livres, et permettre de les ajouter aux favoris
import { getBooks, toggleFavorite } from '../services/api.js'
import { authState } from '../main.js'

export default {
  name: 'AllBooks',
//pour stocker les livres récupérés du backend, l'état de chargement, et les favoris de l'utilisateur
  data() {
    return {
      books: [],
      loading: true,
      defaultCover: 'https://via.placeholder.com/200x280/ffbdd8/f43f87?text=📖',
      favoriteIds: new Set(),
    }
  },
  //pour charger les livres au moment où le composant est créé
  async created() {
    await this.loadData()
  },
  //pour calculer l'année actuelle pour la validation du formulaire d'ajout de livre
computed: {
  currentYear() {
    return new Date().getFullYear()
  }
},
//pour les méthodes de l'affichage des livres, et la gestion des favoris
  methods: {
   async loadData() {
  this.loading = true
  try {
    const books = await getBooks()
    this.books = books || []
    this.favoriteIds = new Set()
  } catch (err) {
    console.log(err)
    this.books = []
  } finally {
    this.loading = false
  }
},

   

    /** Check if book is in favorites */
    isFav(bookId) {
      return this.favoriteIds.has(bookId)
    },

    /** Toggle favorite for a book */
    async toggleLike(bookId) {
      const userId = authState.user.id
      await toggleFavorite(userId, bookId)
      // Update local Set reactively
      const updated = new Set(this.favoriteIds)
      if (updated.has(bookId)) {
        updated.delete(bookId)
      } else {
        updated.add(bookId)
      }
      this.favoriteIds = updated
    },

    /** Truncate long descriptions */
    truncate(text, max) {
      if (!text) return ''
      return text.length > max ? text.slice(0, max) + '…' : text
    },

    /** Replace broken image with default */
    handleImgError(e) {
      e.target.src = this.defaultCover
    },
  },
}
</script>

<style scoped>
/* ── Page Header ─────────────────────────────────────────────── */
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

/* ── Books Grid ──────────────────────────────────────────────── */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

/* ── Book Card ───────────────────────────────────────────────── */
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

/* Cover image area */
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
.book-card:hover .book-cover img {
  transform: scale(1.04);
}

/* Like button */
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 38px;
  height: 38px;
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
.like-btn:hover {
  transform: scale(1.15);
  background: white;
}
.like-btn.liked {
  animation: pop 0.25s ease;
}
@keyframes pop {
  0%  { transform: scale(1); }
  50% { transform: scale(1.3); }
  100%{ transform: scale(1); }
}

/* Book info */
.book-info { padding: 16px; }

.book-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.book-author {
  font-size: 0.83rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 3px;
}
.book-meta {
  font-size: 0.78rem;
  color: var(--gray-400);
  margin-bottom: 8px;
}
.book-desc {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ── Empty State ─────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-state span {
  font-size: 4rem;
  display: block;
  margin-bottom: 16px;
}
.empty-state h3 { margin-bottom: 8px; }
.empty-state p  { color: var(--text-muted); margin-bottom: 24px; }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 640px) {
  .page-header { flex-direction: column; gap: 16px; align-items: flex-start; }
  .books-grid  { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
  .book-cover  { height: 180px; }
}
</style>