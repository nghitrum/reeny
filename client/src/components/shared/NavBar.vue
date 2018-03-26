<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src="../../assets/logo.png" class="p-1 mr-3" alt="Reeny">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <div class="form-inline mr-3">
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <div class="btn-group mr-2" role="group">
              <vue-login></vue-login>
              <vue-register></vue-register>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Login from './LoginButton'
import Register from './RegisterButton'

export default {
  components: {
    'vue-login': Login,
    'vue-register': Register
  }

}
</script>
<style scoped>

</style>
