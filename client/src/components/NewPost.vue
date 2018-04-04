<template>
  <div>
    <h1>New Post</h1>
    <vue-images-uploader></vue-images-uploader>
  </div>
</template>

<script>
import ImagesUploader from './post/ImagesUploader'
export default {
  components: {
    'vue-images-uploader': ImagesUploader
  }
}
</script>

<style scoped>

</style>
