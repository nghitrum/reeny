<template>
  <div>
    <input type="file" @change="onFileSelected">
    <button @click="onUpload">Upload</button>
    <div v-for="image in images" v-bind:key="image.public_id">
      <img :src="image.url" class="img-thumbnail">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      selectedFile: null,
      images: []
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const formData = new FormData()
      formData.append('myFile', this.selectedFile, this.selectedFile.name)
      axios.post('http://localhost:4000/api/upload/image',
        formData
      ).then(res => {
        this.images.push(res.data.result)

        this.selectedFile = null
        this.$emit('addImages', this.images)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
