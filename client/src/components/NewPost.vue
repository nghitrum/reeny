<template>
  <div>
    <h1>New Post</h1>
    <!-- <vue-images-uploader></vue-images-uploader> -->
    <vue-tags-uploader v-on:addTags="getTags($event)"></vue-tags-uploader>
  </div>
</template>

<script>
import ImagesUploader from './post/ImagesUploader'
import TagsUploader from './post/TagsUploader'

export default {
  components: {
    'vue-images-uploader': ImagesUploader,
    'vue-tags-uploader': TagsUploader
  },
  methods: {
    getTags (tags) {
      // TODO: add tags.old to database for post
      // TODO: add tags.new to database then add it to post
    }
  }
}
</script>

<style scoped>

</style>
