<template>
  <div>
    <div>
      <div class="form-group">
        <h3>Login page:</h3>
        <br>
        <label>Email:</label>
        <input type="email" placeholder="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="password" class="form-control" v-model="password">
      </div>
      <button type="submit" class="btn btn-success" @click="login">Login</button>
    </div>
    <hr>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      token: '',
    }
  },
  created () {
    let token = localStorage.getItem('blog');
    if (token) {
      this.$router.push({ name: 'admin' });
    }
  },
  methods: {
    login: function () {
      let payload = {
        email: this.email,
        password: this.password,
      }
      axios.post(`${process.env.VUE_APP_BASE_URI}/api/users/login`, payload)
        .then(response => {
          swal("Horrey!", "login success!", 'success')
          this.token = response.data.data.tokens[0].token;
          localStorage.setItem('blog', this.token);
          this.$router.push({ name: 'admin' })
        }).catch(() => {
          swal("Oops!", "Something went wrong!");
        })
    }
  }
}
</script>