<template>
  <div class="form-card">
    <div class="form-header">
      <h2>Welcome back</h2>
      <p>Sign in to your account</p>
    </div>
    <div class="form-body">
      <div class="field">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="Enter your username" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>
      <button class="btn-main" @click="handleLogin" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      <button class="btn-switch" @click="$router.push('/register')">
        Switch to Register
      </button>
    </div>
  </div>
</template>
<script setup >
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

.form-card {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(30, 60, 120, 0.10);
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}
.form-header {
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  padding: 22px 32px 18px;
  color: #fff;
}
.form-header h2 { font-size: 19px; font-weight: 600; margin-bottom: 3px; }
.form-header p { font-size: 12px; opacity: 0.75; font-weight: 300; }
.form-body { padding: 28px 32px 32px; }
.field { margin-bottom: 18px; }
.field label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #4a6080;
  margin-bottom: 6px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.field input {
  width: 100%;
  padding: 10px 13px;
  border: 1.5px solid #d0daea;
  border-radius: 8px;
  font-size: 14px;
  color: #1a2a3a;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  background: #f7faff;
  transition: border 0.18s, background 0.18s;
}
.field input:focus { border-color: #2563a8; background: #fff; }
.field input::placeholder { color: #a0b0c8; }
.btn-main {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.18s;
  margin-top: 4px;
}
.btn-main:hover:not(:disabled) {
  box-shadow: 0 4px 14px rgba(37, 99, 168, 0.35);
  transform: translateY(-1px);
}
.btn-main:disabled { opacity: 0.65; cursor: not-allowed; }
.btn-switch {
  width: 100%;
  padding: 11px;
  background: transparent;
  color: #2563a8;
  border: 1.5px solid #c0d4ee;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.18s;
  margin-top: 10px;
}
.btn-switch:hover { background: #f0f6ff; border-color: #2563a8; }
.error {
  font-size: 13px;
  color: #e53e3e;
  margin-bottom: 10px;
  padding: 8px 12px;
  background: #fff5f5;
  border-radius: 6px;
  border: 1px solid #fed7d7;
}
</style>