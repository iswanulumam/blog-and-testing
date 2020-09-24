<template>
  <div>
    <h4>This is admin page, you can add new article here. | or go to <router-link to="/manage">admin (manage)</router-link></h4>
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
      <button type="submit" class="btn btn-primary" @click="postArticle">Submit</button>
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
  },
  methods: {
    postArticle: function () {
      let token = localStorage.getItem('blog');
      let payload = {
        title: this.title,
        text: this.text,
        imageUrl: this.imageUrl,
      }
      axios.post(`${process.env.VUE_APP_BASE_URI}/api/articles`, payload, { headers: { 'x-auth': token } })
        .then(() => {
          this.$router.push({ name: 'manage' })
          swal("Horrey!", "Upload success!", 'success');
        }).catch(() => {
          swal("Oops!", "Something went wrong!");
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
