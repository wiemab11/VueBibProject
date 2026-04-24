<template>
  <!-- ============================================================
       Login.vue — Login Page
       ============================================================ -->
  <div class="page">
    <div class="container auth-container">
      <div class="auth-card">

        <!-- Header -->
        <div class="auth-header">
          <span class="auth-icon">🔑</span>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your reading journey.</p>
        </div>

        <!-- Error message -->
        <div v-if="error" class="alert alert-error">{{ error }}</div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">

          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-input"
              placeholder="Your password"
              required
              autocomplete="current-password"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-lg full-width" :disabled="loading">
            <span v-if="loading" class="btn-spinner"></span>
            {{ loading ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <!-- Footer link -->
        <p class="auth-footer">
          Don't have an account?
          <router-link to="/register">Create one →</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//permet de gérer la connexion de l'utilisateur, en envoyant les données du formulaire au backend et en stockant l'état de connexion globalement
import { login } from '../services/api.js'
import { authState } from '../main.js'

export default {
  name: 'Login',
//pour stocker les données du formulaire de connexion, ainsi que les états d'erreur et de chargement
  data() {
    return {
      form: { email: '', password: '' },
      error: '',
      loading: false,
    }
  },
//soumision du formulaire de connexion, avec gestion des erreurs et redirection en cas de succès
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true
      try {
        const data = await login(this.form)
        // Save user to global auth state + localStorage
        authState.login(data)
        // Redirect to books page
        this.$router.push('/books')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 44px 40px;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.4s ease both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}
.auth-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}
.auth-header h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
}
.auth-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.full-width { width: 100%; justify-content: center; }

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Inline spinner for button */
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

@media (max-width: 480px) {
  .auth-card { padding: 32px 24px; }
}
</style>