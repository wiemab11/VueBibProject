<script>
export default {
  data() {
    return {
      books: []
    }
  }
}
</script>

<template>
  <div>

    <!-- Hero -->
    <div class="hero">
      <h2>Découvrez des livres pour tous les goûts</h2>
      <p>Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.</p>

      <button class="btn-hero" @click="$router.push('/books')">
        Explorer le catalogue
      </button>
    </div>

    <!-- Livres populaires -->
    <div class="section">
      <h3>Livres populaires</h3>

      <div class="books-grid">
        <div class="book-card" v-for="book in books" :key="book.id">
          <img :src="book.image" :alt="book.title" />

          <div class="book-info">
            <h4>{{ book.title }}</h4>
            <p>{{ book.description }}</p>

            <button
              class="btn-voir"
              @click="$router.push(`/books/${book.id}`)"
            >
              Voir plus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-section">
      <h3>Besoin d'aide ?</h3>
      <p>Contactez-nous pour toute question ou assistance.</p>

      <button class="btn-contact">Contactez-nous</button>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
.hero {
  background: #f5f7fa;
  padding: 48px 20px;
  text-align: center;
  border-bottom: 1px solid #e0e6f0;
}
.hero h2 { font-size: 26px; font-weight: 600; color: #7654a9; margin-bottom: 10px; }
.hero p  { font-size: 13px; color: #6450d4; margin-bottom: 22px; }
.btn-hero {
  padding: 10px 26px;
  background: linear-gradient(135deg, #6a41be, #501cde);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
}
.btn-hero:hover { box-shadow: 0 4px 14px rgba(37,99,168,0.35); transform: translateY(-1px); }

.section { padding: 36px 24px; }
.section h3 { text-align: center; font-size: 16px; font-weight: 500; color: #1a2a3a; margin-bottom: 24px; }
.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  max-width: 860px;
  margin: 0 auto;
}
.book-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(30,60,120,0.08);
  overflow: hidden;
  border: 1px solid #e8eef6;
}
.book-card img { width: 100%; height: 200px; object-fit: cover; }
.book-info { padding: 14px; }
.book-info h4 { font-size: 13px; font-weight: 500; color: #1a2a3a; margin-bottom: 5px; }
.book-info p  { font-size: 12px; color: #6a82a0; margin-bottom: 12px; line-height: 1.5; }
.btn-voir {
  padding: 8px 18px;
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
}
.btn-voir:hover { box-shadow: 0 3px 10px rgba(37,99,168,0.3); transform: translateY(-1px); }

.footer-section {
  background: #2c3e50;
  padding: 36px 20px;
  text-align: center;
}
.footer-section h3 { font-size: 15px; font-weight: 500; color: #fff; margin-bottom: 8px; }
.footer-section p  { font-size: 12px; color: rgba(255,255,255,0.65); margin-bottom: 18px; }
.btn-contact {
  padding: 9px 22px;
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
}
.btn-contact:hover { box-shadow: 0 3px 10px rgba(37,99,168,0.4); transform: translateY(-1px); }
</style>