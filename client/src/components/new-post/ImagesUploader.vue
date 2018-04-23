<template>
  <div>
    <div v-for="(image, index) in serverImages" v-bind:key="index">
      <img :src="image" class="img-thumbnail float-left" :index="index" @click="deleteImageServer($event)">
    </div>
    <div v-for="(image, index) in images" v-bind:key="index">
      <img :src="image" class="img-thumbnail float-left" :index="index" @click="deleteImage($event)">
    </div>
    <div class="clear"></div>
    <input type="file" @change="onFileSelected">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['inputImages'],
  data () {
    return {
      selectedFile: null,
      images: [],
      files: [],
      deletedImageServer: [],
      serverImages: []
    }
  },
  watch: {
    inputImages () {
      if (this.inputImages.length > 0) {
        this.inputImages.forEach(element => {
          this.serverImages.push(element)
        })
      }
    }
  },
  methods: {
    deleteImageServer (event) {
      let index = event.target.attributes.index.value
      this.serverImages.splice(index, 1)
      const publicId = event.target.attributes.src.value.split('/').slice(-1).pop().slice(0, -4)
      axios.delete(`http://localhost:4000/api/delete/image/reeny/${publicId}`)

      this.$emit('addImages', { 'old': this.serverImages, 'new': this.files })
    },
    deleteImage (event) {
      let index = event.target.attributes.index.value
      this.images.splice(index, 1)
      this.files.splice(index, 1)

      this.$emit('addImages', { 'old': this.serverImages, 'new': this.files })
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.files.push(this.selectedFile)
      // Show thumbnail instantly
      var reader = new FileReader()
      reader.onload = (function (theFile, theList) {
        return function (e) {
          theList.push(e.target.result)
        }
      })(this.selectedFile, this.images)

      reader.readAsDataURL(this.selectedFile)
      // console.log(this.files)
      this.$emit('addImages', { 'old': this.serverImages, 'new': this.files })
    }
  }
}
</script>

<style scoped>
.img-thumbnail {
  width: 100px;
}
.clear {
  clear: both;
}
</style>
