<template>
  <div class="col-sm-8 blog-main">
    <div class="blog-post" v-for="article in articles" :key="article._id">
      <h2 class="">{{ article.title }}</h2>
      <p class="blog-post-meta">{{ article.createdAt | prettyDate }} <a href="#">{{ article._creator.username }}</a></p>
      <p>{{ article.text }}</p>
    </div><!-- /.blog-post -->
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  computed: {
    articles () {
      return this.$store.state.articles
    }
  },
  created: function () {
    this.$store.dispatch('getArticles')
  }
}
</script>

