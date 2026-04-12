<script>
import axios from "axios";
//ajouter add book
export default {

  data() {
    return {
      title: "",
      image: "",
      editor: "",
      year: "",
      description: "",
      author: "",

      authors: [],

      errorMsg: "",
      successMsg: ""
    };
  },

  mounted() {
    this.fetchAuthors();
  },


  methods: {
    // ✅ تجيب authors من backend
    async fetchAuthors() {
      try {
        const res = await axios.get("http://localhost:3000/authors");
        this.authors = res.data;
      } catch (error) {
        this.errorMsg = "Error loading authors";
      }
    },

    // ✅ add book
    async handleAddBook() {
      this.errorMsg = "";
      this.successMsg = "";

      // validation
      if (!this.title || !this.editor || !this.year || !this.author) {
        this.errorMsg = "Please fill all required fields";
        return;
      }


      const newBook = {
        title: this.title,
        image: this.image,
        editor: this.editor,
        year: this.year,
        description: this.description,
        authorId: this.author
      };

      try {
        await axios.post("http://localhost:3000/books", newBook);

        this.successMsg = "Book added successfully ✅";

        // reset form
        this.title = "";
        this.image = "";
        this.editor = "";
        this.year = "";
        this.description = "";
        this.author = "";

      } catch (error) {
        this.errorMsg = "Error adding book ❌";
      }
    }
  }
};
</script>

<template>
  <div class="form-card">
    <div class="form-header">
      <h2>Add Book</h2>
    </div>

    <div class="form-body">

      <div class="field">
        <label>Title</label>
        <input v-model="title" type="text" placeholder="Book title" />
      </div>

      <div class="field">
        <label>Image</label>
        <input v-model="image" type="text" placeholder="Image URL" />
      </div>

      <div class="field">
        <label>Editor</label>
        <input v-model="editor" type="text" placeholder="Editor name" />
      </div>

      <div class="field">
        <label>Year</label>
        <input v-model="year" type="number" placeholder="2024" />
      </div>

      <div class="field">
        <label>Description</label>
        <textarea v-model="description" placeholder="Book description..."></textarea>
      </div>

      <div class="field">
        <label>Author</label>
        <select v-model="author">
          <option value="">Select an author</option>
          <option v-for="a in authors" :key="a.id" :value="a.id">
            {{ a.name }}
          </option>
        </select>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>

      <button class="btn-main" @click="handleAddBook">Ajouter Livre</button>

    </div>
  </div>

</template>

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
.field input,
.field textarea,
.field select {
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
.field input:focus,
.field textarea:focus,
.field select:focus   { border-color: #2563a8; background: #fff; }
.field input::placeholder,
.field textarea::placeholder { color: #a0b0c8; }
.field textarea { resize: vertical; min-height: 90px; }
.field select   { appearance: none; cursor: pointer; }
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