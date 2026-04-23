<template>
  <!-- ============================================================
       Register.vue — Registration Page
       ============================================================ -->
  <div class="page">
    <div class="container auth-container">
      <div class="auth-card">

        <!-- Header -->
        <div class="auth-header">
          <span class="auth-icon">✨</span>
          <h1>Join Book Store</h1>
          <p>Create your account and start exploring.</p>
        </div>

        <!-- Error / Success messages -->
        <div v-if="error"   class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister">

          <div class="form-group">
            <label class="form-label" for="name">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Jane Austen"
              required
              autocomplete="name"
            />
          </div>

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
              placeholder="At least 6 characters"
              minlength="6"
              required
              autocomplete="new-password"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-lg full-width" :disabled="loading">
            <span v-if="loading" class="btn-spinner"></span>
            {{ loading ? 'Creating account…' : 'Create Account' }}
          </button>
        </form>

        <!-- Footer link -->
        <p class="auth-footer">
          Already have an account?
          <router-link to="/login">Sign in →</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../services/api.js'

export default {
  name: 'Register',

  data() {
    return {
      form: { name: '', email: '', password: '' },
      error: '',
      success: '',
      loading: false,
    }
  },

  methods: {
    async handleRegister() {
      this.error = ''
      this.success = ''
      this.loading = true
      try {
        await register(this.form)
        this.success = '🎉 Account created! Redirecting to login…'
        // Redirect to login after short delay
        setTimeout(() => this.$router.push('/login'), 1500)
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
/* Reuse same styles as Login — shared auth layout */
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
.auth-header h1 { font-size: 1.8rem; margin-bottom: 8px; }
.auth-header p  { color: var(--text-muted); font-size: 0.95rem; }

.full-width { width: 100%; justify-content: center; }

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 0.9rem;
  color: var(--text-muted);
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

@media (max-width: 480px) {
  .auth-card { padding: 32px 24px; }
}
</style>