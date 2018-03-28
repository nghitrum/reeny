<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>

    <div class="content">
      <div class="inner-wrapper">
        <div class="main-area">
          <vue-post></vue-post>
        </div>
        <div class="sticky-side-area">
          <vue-side></vue-side>
        </div>
      </div>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'
import Post from './shared/DetailPostPage'
import Sidearea from './shared/SideArea'

export default {
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer,
    'vue-post': Post,
    'vue-side': Sidearea
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
