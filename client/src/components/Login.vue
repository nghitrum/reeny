<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>

    <div class="content">

    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'

export default {
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer
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
