<template>
  <div class="content">
    <div class="row">
      <div class="main-area">
        <vue-post-detail></vue-post-detail>
      </div>
    </div>
  </div>
</template>

<script>
import PostDetail from '@/components/post/PostDetail'

export default {
  components: {
    'vue-post-detail': PostDetail
  }
}
</script>

<style scoped>

</style>
