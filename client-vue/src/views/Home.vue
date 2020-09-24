<template>
  <div class="row">
    <BlogPost />
    <Sidebar />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BlogPost from '@/components/BlogPost.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    BlogPost,
    Sidebar
  }
}
</script>
