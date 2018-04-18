<template>
  <div class="m-3 p-3 border rounded">
    <!-- show errors -->
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errors.length > 0">
      <ol>
        <li v-for="err in errors" v-bind:key="err" v-html="err"></li>
      </ol>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!--  -->
    <form class="" novalidate>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-on:keydown.enter.prevent='doNothing' type="text" class="form-control form-control-lg" id="title" placeholder="Tell us your headline" v-model="title" required autofocus>
      </div>
      <div class="form-group">
        <label for="content">How was that?</label>
        <textarea class="form-control" id="content" rows="3" placeholder="Tell us your experience..." v-model="content" required></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Rate it</label>
        <vue-rating v-on:addRating="getRating($event)"></vue-rating>
      </div>
      <div class="form-group">
        <label for="photos">Any pictures?</label>
        <vue-images-uploader v-on:addImages="getImages($event)"></vue-images-uploader>
      </div>
      <div class="form-group">
        <label for="tags">Any tags?</label>
        <vue-tags-uploader v-on:addTags="getTags($event)"></vue-tags-uploader>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="term" v-model="terms">
        <label class="form-check-label" for="term">I have read the
          <a href="/terms-of-service">terms and conditions</a>.</label>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-dark btn-lg border mt-5" @click="upload">Post Now
              <i v-if="spin === true" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import ImagesUploader from '@/components/new-post/ImagesUploader'
import TagsUploader from '@/components/new-post/TagsUploader'
import Rating from '@/components/new-post/Rating'
import { USER_TOKEN } from '@/constants/setting'
import gql from 'graphql-tag'
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      content: '',
      rating: 0,
      images: [],
      oldTags: [],
      newTags: [],
      terms: '',
      user: JSON.parse(localStorage.getItem(USER_TOKEN)),
      errors: [],
      spin: false
    }
  },
  components: {
    'vue-images-uploader': ImagesUploader,
    'vue-tags-uploader': TagsUploader,
    'vue-rating': Rating
  },
  methods: {
    doNothing (event) {
      event.preventDefault()
    },
    getTags (tags) {
      this.oldTags = tags.old
      this.newTags = tags.new
    },
    getImages (images) {
      this.images = images
    },
    getRating (rating) {
      this.rating = rating
    },
    upload (e) {
      this.errors = []
      // check title is empty
      if (this.title.length === 0) {
        this.errors.push('<strong>Title</strong> is required.')
      }
      // check content is empty
      if (this.content.trim().length === 0) {
        this.errors.push('<strong>Content</strong> is required.')
      }
      // check tags is empty
      if (this.oldTags.length === 0 && this.newTags.length === 0) {
        this.errors.push('<strong>Tags</strong> are required.')
      }
      // check terms and condition is checked
      if (!this.terms) {
        this.errors.push('<strong>Terms and condition</strong> is required.')
      }

      // form validated well
      if (!this.errors.length) {
        this.spin = true
        // upload images to cloudinary
        let uploadedImages = []
        let axiosArr = []
        this.images.forEach(image => {
          const formData = new FormData()
          formData.append('myFile', image, image.name)
          axiosArr.push(axios.post('http://localhost:4000/api/upload/image',
            formData
          ))
        })
        axios.all(axiosArr).then(res => {
          // finishing upload images
          res.forEach(element => {
            uploadedImages.push(element.data.result.url)
          })

          // upload new tags and get all old tags ID
          let uploadedTags = []
          // old tags already have IDs
          this.oldTags.forEach(tag => {
            uploadedTags.push(tag.id)
          })
          // upload only new tag by mutation
          const uploadNewTags = gql`
          mutation uploadTag($inputName: String) {
            addTag(name: $inputName) {
              id
            }
          }
          `
          axiosArr = []
          this.newTags.forEach(tag => {
            axiosArr.push(
              this.$apollo.mutate({
                mutation: uploadNewTags,
                variables: {
                  inputName: tag
                }
              }))
          })
          axios.all(axiosArr).then(res => {
            res.forEach(element => {
              uploadedTags.push(element.data.addTag.id)
            })
            // done new tags uploaded

            // now post new
            const uploadPostMutation = gql`
            mutation uploadPost($inputTitle: String, $inputContent: String, $inputTags: [ID], $inputRating: Int, $inputImages: [String], $inputUser: ID ) {
              addPost(title: $inputTitle, content: $inputContent, tags: $inputTags, rating: $inputRating, images: $inputImages, user: $inputUser) {
                id
              }
            }
            `
            this.$apollo.mutate({
              mutation: uploadPostMutation,
              variables: {
                inputTitle: this.title,
                inputContent: this.content,
                inputRating: this.rating,
                inputImages: uploadedImages,
                inputTags: uploadedTags,
                inputUser: this.user.id
              }
            }).then(res => {
              this.$router.replace('/post/' + res.data.addPost.id)
            }).catch(err => {
              console.log(err)
            })
          })
        })
      }

      e.preventDefault()
    }
  }
}
</script>

<style scoped>

</style>
