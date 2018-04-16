<template>
  <div>
    <div v-for="(image, index) in images" v-bind:key="index">
      <img :src="image" class="img-thumbnail float-left" :index="index" @click="deleteImage($event)">
    </div>
    <div class="clear"></div>
    <input type="file" @change="onFileSelected">
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: null,
      images: [],
      files: []
    }
  },
  methods: {
    deleteImage (event) {
      let index = event.target.attributes.index.value
      this.images.splice(index, 1)
      this.files.splice(index, 1)

      this.$emit('addImages', this.files)
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
      this.$emit('addImages', this.files)
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
