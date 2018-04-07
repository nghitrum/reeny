<template>
  <div>
    <h1>New Post</h1>
    <vue-images-uploader v-on:addImages="getImages($event)"></vue-images-uploader>
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
    },
    getImages (images) {
      // console.log(images[0].public_id)
      // TODO: add images[0] to database
    }
  }
}
</script>

<style scoped>

</style>
