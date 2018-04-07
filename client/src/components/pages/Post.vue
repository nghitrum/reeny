<template>
  <div class="content">
    <div class="row">
      <div class="main-area">
        <vue-post></vue-post>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/shared/DetailPostPage'

export default {
  components: {
    'vue-post': Post
  }
}
</script>

<style scoped>

</style>
