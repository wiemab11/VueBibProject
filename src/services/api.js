
//c'est le fichier qui contient toutes les fonctions pour communiquer avec le backend (API calls)

const BASE_URL = 'http://localhost:8081/api'

//gere les headers pour les requetes, notamment pour ajouter le token d'authentification si l'utilisateur est connecté

const getHeaders = () => {
  const token = localStorage.getItem('token')
   return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// AUTH
//les fonctions pour s'inscrire, se connecter, et gérer les livres et favoris

export const register = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      username: name, 
      email,
      password
    })
  })

  if (res.status === 409) {
    throw new Error("Email or username already exists")
  } else if (!res.ok) {
    throw new Error("Register failed")
  }

  return res.json()
}

export const login = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      password
    })
  })

  if (res.status === 401) {
    throw new Error("Invalid email or password")
  } else if (!res.ok) {
    throw new Error("Login failed")
  }

  return res.json()
}


// BOOKS


export const getBooks = async () => {
  const res = await fetch(`${BASE_URL}/books/all`, {
    headers: getHeaders()
  })

  if (!res.ok) throw new Error("Error fetching books")

  const data = await res.json()
  return data.listeBooks
}

export const addBook = async (book) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}/books/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(book),
  })

  if (!res.ok) throw new Error("Error adding book")
  return res.json()
}

export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/books/remove/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) throw new Error("Error deleting book")
  return res.json()
}

export const getBookById = async (id) => {
  const res = await fetch(`${BASE_URL}/books/search/${id}`)

  if (!res.ok) throw new Error("Error fetching book")
  return res.json()
}


//  FAVORITES
export const getFavorites = async (userId) => {
  const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`)

  if (!res.ok) throw new Error("Error fetching favorites")
  return res.json()
}

export const toggleFavorite = async (userId, bookId) => {
  const res = await fetch(`${BASE_URL}/favorites/toggle`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ userId, bookId })
  })

  if (!res.ok) throw new Error("Error toggling favorite")
  return res.json()
}

