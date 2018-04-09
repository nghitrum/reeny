<template>
  <div>
    <h1>New Post</h1>
    <vue-images-uploader v-on:addImages="getImages($event)"></vue-images-uploader>
    <vue-tags-uploader v-on:addTags="getTags($event)"></vue-tags-uploader>
    <vue-rating v-on:addRating="getRating($event)"></vue-rating>
  </div>
</template>

<script>
import ImagesUploader from '@/components/new-post/ImagesUploader'
import TagsUploader from '@/components/new-post/TagsUploader'
import Rating from '@/components/new-post/Rating'

export default {
  components: {
    'vue-images-uploader': ImagesUploader,
    'vue-tags-uploader': TagsUploader,
    'vue-rating': Rating
  },
  methods: {
    getTags (tags) {
      // TODO: add tags.old to database for post
      // TODO: add tags.new to database then add it to post
    },
    getImages (images) {
      // console.log(images[0].public_id)
      // TODO: add images[0] to database
    },
    getRating (rating) {
      // console.log(rating)
      // TODO:
    }
  }
}
</script>

<style scoped>

</style>
