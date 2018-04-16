<template>
  <div class="wrapper">
    <vue-navbar></vue-navbar>
    <div class="content">
      <div class="inner-wrapper">
        <div class="main-area">
          <div class="container">
            <router-view></router-view>
          </div>
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
import NavBar from './components/shared/NavBar'
import Footer from './components/shared/Footer'
import Sidearea from './components/shared/SideArea'

export default {
  name: 'App',
  components: {
    'vue-navbar': NavBar,
    'vue-footer': Footer,
    'vue-side': Sidearea
  }
}
</script>
