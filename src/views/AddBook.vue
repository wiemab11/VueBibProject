<template>

  <div class="page">
    <div class="container">
      <div class="form-page">

        <!-- ── Page Title  -->
        <div class="form-header">
          <h1>✍️ Add a New Book</h1>
          <p>Fill in the details below to add a book to the catalog.</p>
        </div>

        <!-- Error / Success -->
        <div v-if="error"   class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>

        <!-- ── Add Book Form -->
        <form @submit.prevent="handleSubmit" class="book-form">

          <!-- Two columns: left (main info) + right (cover preview) -->
          <div class="form-layout">

            <!-- LEFT COLUMN -->
            <div class="form-fields">

              <div class="form-group">
                <label class="form-label" for="title">Book Title *</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  class="form-input"
                  placeholder="Book Title"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="image">Cover Image URL</label>
                <input
                  id="image"
                  v-model="form.image"
                  type="url"
                  class="form-input"
                  placeholder="https://example.com/cover.jpg"
                />
                <span class="form-hint">Paste a URL to the book cover image.</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="editor">Publisher / Editor *</label>
                  <input
                    id="editor"
                    v-model="form.editor"
                    type="text"
                    class="form-input"
                    placeholder="Publisher or Editor"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="year">Publication Year *</label>
                  <input
                    id="year"
                    v-model.number="form.year"
                    type="number"
                    class="form-input"
                    placeholder="e.g. 1999"
                    min="1000"
                    :max="currentYear"
                    required
                  />
                </div>
              </div>
            </div>

            
          </div>

          <!-- Submit -->
          <div class="form-actions">
            <router-link to="/books" class="btn btn-ghost">Cancel</router-link>
            <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
              <span v-if="loading" class="btn-spinner"></span>
              {{ loading ? 'Saving…' : '📚 Add Book' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
//composant de la page d'ajout de livre, qui contient un formulaire pour saisir les détails du livre et une prévisualisation de la couverture
import { addBook  } from '../services/api.js'

export default {
  name: 'AddBook',
//pour stocker les données du formulaire, ainsi que les états de chargement, d'erreur, et de succès
  data() {
  return {
    form: {
      title: '',
      image: '',
      editor: '',
      year: new Date().getFullYear(),
    },
    currentYear: new Date().getFullYear(), 
    loading: false,
    error: '',
    success: ''
  }
},

  
//pour gérer la soumission du formulaire, en envoyant les données au backend et en affichant les messages de succès ou d'erreur
  methods: {
    async handleSubmit() {
      this.error = ''
      this.success = ''
      this.loading = true
      try {
        await addBook(this.form)
        this.success = '✅ Book added successfully! Redirecting…'
        setTimeout(() => this.$router.push('/books'), 1500)
      } catch (err) {
        this.error = err.message || 'Something went wrong.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.form-page {
  max-width: 860px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}
.back-link:hover { color: var(--primary); }

.form-header {
  margin-bottom: 32px;
}
.form-header h1 { font-size: 2rem; margin-bottom: 6px; }
.form-header p  { color: var(--text-muted); }

/* ── Form Layout ─────────────────────────────────────────────── */
.book-form {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 36px;
  box-shadow: var(--shadow-md);
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 40px;
  margin-bottom: 32px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-hint {
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-top: 4px;
}
.loading-hint { color: var(--primary); }

/* ── Cover Preview ───────────────────────────────────────────── */
.cover-preview-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cover-preview {
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: var(--radius-md);
  border: 2px dashed var(--border);
  overflow: hidden;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover-placeholder {
  text-align: center;
  padding: 24px;
}
.cover-placeholder span { font-size: 2.5rem; display: block; margin-bottom: 8px; }
.cover-placeholder p    { font-size: 0.8rem; color: var(--gray-400); line-height: 1.4; }
.cover-placeholder.error span { filter: grayscale(1); }

/* ── Form Actions ─────────────────────────────────────────────── */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1.5px solid var(--border);
}

.btn-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .book-form { padding: 24px 20px; }
  .form-layout { grid-template-columns: 1fr; }
  .cover-preview-col { order: -1; }
  .cover-preview { max-width: 200px; }
  .form-row { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column-reverse; }
  .form-actions .btn { width: 100%; justify-content: center; }
}
</style>