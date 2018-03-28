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
              <div v-if="!user">
                <button type="button" class="btn btn-secondary" @click="signUp">Sign In</button>
              </div>
              <div v-else>
                <div class="dropdown show">
                  <div class="btn-group">
                    Hello&nbsp;
                    <a href="" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <strong>{{ user.username }}</strong>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item" type="button" @click="logout">Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { USER_TOKEN } from '@/constants/setting'

export default {
  data () {
    return {
      user: JSON.parse(localStorage.getItem(USER_TOKEN))
    }
  },
  methods: {
    logout () {
      this.user = null
      localStorage.removeItem(USER_TOKEN)
      this.$router.replace('/')
    },
    signUp () {
      this.$router.replace('/authentication')
    }
  }

}
</script>
<style scoped>

</style>
