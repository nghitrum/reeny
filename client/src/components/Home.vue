<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>

    <div class="content">
      <div class="inner-wrapper">
        <div class="main-area">
          <!-- <vue-test></vue-test> -->
          <vue-post-list></vue-post-list>
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
import PostList from './shared/PostList'
import Sidearea from './shared/SideArea'
import Test from './Test'

export default {
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer,
    'vue-post-list': PostList,
    'vue-side': Sidearea,
    'vue-test': Test
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
