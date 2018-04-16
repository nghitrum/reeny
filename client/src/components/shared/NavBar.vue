<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'Home'}"><img src="../../assets/logo.png" class="p-1 mr-3" alt="Reeny"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <div class="form-inline mr-3">
          <vue-search></vue-search>
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
import Search from '@/components/shared/Search'

export default {
  data () {
    return {
      user: JSON.parse(localStorage.getItem(USER_TOKEN))
    }
  },
  components: {
    'vue-search': Search
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
.bg-light {
  background-color: #f3f0f0 !important;
}
</style>
