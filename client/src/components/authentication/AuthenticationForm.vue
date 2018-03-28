<template>
  <div class="row justify-content-md-center m-3">
    <div class="col-6 p-5 rounded bg-light">
      <form method="POST" @submit.prevent="userLogin">
        <div class="form-group" v-if="!validation">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Incorrect
            <strong>username</strong> or
            <strong>password</strong>. Please try again.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control form-control-lg" id="username" aria-describedby="usernameHelp" placeholder="Enter username" required v-model="username">
        </div>
        <div class="form-group" v-if="!login">
          <label for="email">Email address</label>
          <input type="email" class="form-control form-control-lg" id="email" aria-describedby="emailHelp" placeholder="Enter email" required v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control form-control-lg" id="password" placeholder="Password" required v-model="password">
        </div>
        <div class="form-check" v-if="login">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Remember Me?</label>
        </div>
        <div class="form-group text-right">
          <button type="submit" class="btn btn-outline-secondary btn-lg" @click="userLogin">{{login ? 'Sign In' : 'Sign Up'}}</button>
        </div>
        <div class="form-group">
          <a href="#" @click="login = !login">
            <p v-if="!login">Already have an account? Sign In</p>
            <p v-else>Don't have account yet? Sign Up</p>
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { USER_TOKEN } from '@/constants/setting'

const mutation = gql`
  mutation LoginMutation($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      email
      username
    }
  }
`

export default {
  data () {
    return {
      email: '',
      login: true,
      username: '',
      password: '',
      validation: true
    }
  },
  methods: {
    userLogin () {
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        if (response.data.login) {
          // save user token to localstorage
          localStorage.setItem(USER_TOKEN, JSON.stringify(response.data.login))
          // redirect user
          this.$router.replace('/')
          // console.log(response.data.login)
        } else {
          if (this.username !== '' && this.password !== '') {
            this.validation = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
