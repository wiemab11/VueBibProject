<template>
  <div class="form-card">

    <div class="form-header">
      <h2>Create account</h2>
    </div>

    <div class="form-body">

      <div class="field">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="Choose a username" />
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="your@email.com" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>

      <button class="btn-main" @click="handleRegister">Register</button>
      <button class="btn-switch" @click="$router.push('/login')">Switch to Login</button>

    </div>
  </div>
</template>

<script setup >
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

.form-card {
  max-width: 380px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(30, 60, 120, 0.10);
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}
.form-header {
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  padding: 18px 28px;
  color: #fff;
}
.form-header h2 { font-size: 17px; font-weight: 600; }
.form-body { padding: 22px 28px 26px; }
.field { margin-bottom: 14px; }
.field label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #4a6080;
  margin-bottom: 5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.field input {
  width: 100%;
  padding: 9px 12px;
  border: 1.5px solid #d0daea;
  border-radius: 8px;
  font-size: 13px;
  color: #1a2a3a;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  background: #f7faff;
  transition: border 0.18s;
}
.field input:focus        { border-color: #2563a8; background: #fff; }
.field input::placeholder { color: #a0b0c8; }
.btn-main {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  margin-top: 4px;
}
.btn-main:hover {
  box-shadow: 0 4px 14px rgba(37, 99, 168, 0.35);
  transform: translateY(-1px);
}
.btn-switch {
  width: 100%;
  padding: 9px;
  background: transparent;
  color: #2563a8;
  border: 1.5px solid #c0d4ee;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  margin-top: 8px;
}
.btn-switch:hover { background: #f0f6ff; border-color: #2563a8; }
.error {
  font-size: 12px;
  color: #e53e3e;
  margin-bottom: 10px;
  padding: 7px 11px;
  background: #fff5f5;
  border-radius: 6px;
  border: 1px solid #fed7d7;
}
.success {
  font-size: 12px;
  color: #276749;
  margin-bottom: 10px;
  padding: 7px 11px;
  background: #f0fff4;
  border-radius: 6px;
  border: 1px solid #9ae6b4;
}
</style>