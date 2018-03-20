<template>
  <div>
    <vue-navbar></vue-navbar>
    <h1>Hello World</h1>
    <p>{{msg}}</p>
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
