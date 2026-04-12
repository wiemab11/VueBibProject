<template>
  <nav class="navbar">
    <h1>Bookstore</h1>
    <div class="links">
      <router-link to="/">Accueil</router-link>
      <router-link to="/books">All-Books</router-link>
      <router-link to="/add-book">Add</router-link>
      <router-link to="/favourites">Favourites</router-link>
      <router-link to="/login">Logout</router-link>
    </div>
  </nav>
</template>
 
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 15px 30px;
}
 
.links {
  display: flex;
  gap: 15px;
}
 

</style>