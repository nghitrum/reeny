<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>
    <div class="content">
      <h1>Hello World</h1>
      <p>{{msg}}</p>
      <vue-test></vue-test>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'
import Test from './Test'

export default {
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer,
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
