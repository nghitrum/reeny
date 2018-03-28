<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>

    <div class="content">
      <vue-authentication-form></vue-authentication-form>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'
import AuthenticationForm from './authentication/AuthenticationForm'

export default {
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer,
    'vue-authentication-form': AuthenticationForm
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
