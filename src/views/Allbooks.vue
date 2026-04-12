<script setup lang="ts">
import { ref } from 'vue';

interface Book {
  id: number;
  title: string;
  editor: string;
  year: number;
  author?: { name: string };
  image: string;
  description: string;
}

const books = ref<Book[]>([]);

const deleteBook = (id: number) => {
  books.value = books.value.filter(book => book.id !== id);
};
</script>

<template>
  
  <div class="page">

    <!-- Top bar -->
    <div class="top-bar">
      <h2>Books</h2>
      <button class="btn-add" @click="$router.push('/add-book')">Add Book</button>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Editor</th>
            <th>Year</th>
            <th>Author</th>
            <th>Image</th>
            <th>Summary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.editor }}</td>
            <td>{{ book.year }}</td>
            <td>{{ book.author?.name }}</td>
            <td class="td-muted">{{ book.image }}</td>
            <td class="td-muted">{{ book.description }}</td>
            <td>
              <button class="btn-icon btn-delete" @click="deleteBook(book.id)">✂</button>
              <button class="btn-icon btn-edit" @click="$router.push(`/edit/${book.id}`)">✏</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

.page { padding: 28px 24px; font-family: 'DM Sans', sans-serif; background: #eef2f7; min-height: 100vh; }

.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.top-bar h2 { font-size: 22px; font-weight: 600; color: #1a2a3a; }

.btn-add {
  padding: 9px 20px;
  background: linear-gradient(135deg, #1a3a5c, #2563a8);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
}
.btn-add:hover { box-shadow: 0 4px 14px rgba(37,99,168,0.35); transform: translateY(-1px); }

.table-wrap {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(30,60,120,0.08);
  overflow: hidden;
  border: 1px solid #e8eef6;
}
table { width: 100%; border-collapse: collapse; }
thead tr { background: #f5f7fa; border-bottom: 1.5px solid #e0e6f0; }
thead th {
  padding: 12px 14px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #4a6080;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
tbody tr { border-bottom: 1px solid #f0f4f8; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: #f8faff; }
tbody td { padding: 12px 14px; font-size: 13px; color: #1a2a3a; vertical-align: middle; }

.td-muted {
  color: #6a82a0;
  font-size: 12px;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-icon {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
}
.btn-delete { background: linear-gradient(135deg, #1a3a5c, #2563a8); color: #fff; }
.btn-edit   { background: linear-gradient(135deg, #1a3a5c, #2563a8); color: #fff; }
.btn-icon:hover { box-shadow: 0 3px 10px rgba(37,99,168,0.3); transform: translateY(-1px); }
</style>