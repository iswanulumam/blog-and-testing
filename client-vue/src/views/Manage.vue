<template>
  <div>
    <h4>Manage article | or go to <router-link to="/admin">admin (upload)</router-link></h4>
    <br>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Created at</th>
          <th>Author</th>
          <th>Action</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="index">
          <td>{{ article.title }}</td>
          <td>{{ article.createdAt | prettyDate }}</td>
          <td>{{ article._creator.username }}</td>
          <td><button class="btn btn-warning" @click="deleteArticle(article._id)">delete</button></td>
          <td><router-link class="btn btn-info" :to="{ name: 'update', params: { id: article._id }}">Edit</router-link></td>
        </tr>
      </tbody>
    </table>
    <hr>
    <button type="submit" class="btn btn-danger" @click="logout">Logout from admin</button>
    <br>
    <br>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

let baseUrl = process.env.VUE_APP_BASE_URI

export default {
  computed: {
    articles () {
      return this.$store.state.articles
    }
  },
  created: function () {
    this.$store.dispatch('getArticles')
    let token = localStorage.getItem('blog');
    if (!token) {
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    deleteArticle: function (articleId) {
      let token = localStorage.getItem('blog')
      axios.delete(`${baseUrl}/api/articles/${articleId}`, { headers: { 'x-auth': token } })
        .then(() => {
            swal("Horrey!", "Delete success!", 'success')
            this.$store.dispatch('getArticles')
        })
        .catch(() => {
            swal("Oops!", "Something went wrong!", 'error')
        });
    },
    logout: function () {
      swal("Horrey!", "logout success!", 'success')
      localStorage.removeItem('blog');
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
