<template>
  <div>
    <h4>Update article. | or go to <router-link to="/manage">admin (manage)</router-link></h4>
    <div>
      <div class="form-group">
        <label>Title:</label>
        <input placeholder="title" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Article:</label>
        <textarea placeholder="article" class="form-control" rows="5" v-model="text"></textarea>
      </div>
      <div class="form-group">
        <label>Url Image</label>
        <input placeholder="url img (optional)" class="form-control" v-model="imageUrl">
      </div>
      <button type="submit" class="btn btn-primary" @click="updateArticle($route.params.id)">Update</button>
    </div>
    <hr>
    <br>
    <button type="submit" class="btn btn-danger" @click="logout">Logout from admin</button>
    <br>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Admin',
  data () {
    return {
      title: '',
      text: '',
      imageUrl: '',
    }
  },
  created () {
    let token = localStorage.getItem('blog');
    if (!token) {
      this.$router.push({ name: 'login' });
    }
    this.getArticleByid(this.$route.params.id)
  },
  methods: {
    getArticleByid: function (articleId) {
      axios.get(`${process.env.VUE_APP_BASE_URI}/api/articles/${articleId}`)
        .then(response => {
          let article = response.data.data
          this.title = article.title
          this.text = article.text
          this.imageUrl = article.imageUrl
        }).catch((e) => {
          swal('Oops!', 'Something wrong!', 'error')
        })
    },
    updateArticle: function (articleId) {
      let token = localStorage.getItem('blog');
      let payload = {
        title: this.title,
        text: this.text,
        imageUrl: this.imageUrl,
      }
      axios.patch(`${process.env.VUE_APP_BASE_URI}/api/articles/${articleId}`, payload, { headers: { 'x-auth': token } })
        .then(() => {
          this.$router.push({ name: 'manage' })
          swal("Horrey!", "Update success!", 'success');
        }).catch(() => {
          swal("Oops!", "Something went wrong!", 'error');
        })
    },
    logout: function () {
      swal("Horrey!", "logout success!", 'success')
      localStorage.removeItem('blog');
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
