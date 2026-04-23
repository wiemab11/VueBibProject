// ============================================================
// BASE URL
// ============================================================

const BASE_URL = "http://localhost:8081/api"

const headers = {
  "Content-Type": "application/json"
}

// ============================================================
// 🔐 AUTH
// ============================================================

export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Register failed")
  return res.json()
}

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Login failed")
  return res.json()
}

// ============================================================
// 📚 BOOKS
// ============================================================

export const getBooks = async () => {
  const res = await fetch(`${BASE_URL}/books/all`)

  if (!res.ok) throw new Error("Error fetching books")
  return res.json()
}

export const addBook = async (data) => {
  const res = await fetch(`${BASE_URL}/books/new`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
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

// ============================================================
// ❤️ FAVORITES
// ============================================================

export const getFavorites = async (userId) => {
  const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`)

  if (!res.ok) throw new Error("Error fetching favorites")
  return res.json()
}

export const toggleFavorite = async (userId, bookId) => {
  const res = await fetch(`${BASE_URL}/favorites/toggle`, {
    method: "POST",
    headers,
    body: JSON.stringify({ userId, bookId })
  })

  if (!res.ok) throw new Error("Error toggling favorite")
  return res.json()
}