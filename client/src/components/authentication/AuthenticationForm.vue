<template>
  <div class="row justify-content-md-center m-3">
    <div class="col-6 p-5 rounded bg-light">
      <form @submit.prevent="submit">
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
        <div class="form-group" v-if="isSuccess">
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            Register Successfully!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="form-group" v-if="usernameExisted">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Username
            <strong>{{this.username}}</strong> is already existed. Please try again.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="form-group" v-if="emailExisted">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Email
            <strong>{{this.email}}</strong> is already existed. Please try again.
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
          <button type="submit" class="btn btn-outline-secondary btn-lg" @click="confirm">{{login ? 'Sign In' : 'Sign Up'}}</button>
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

const loginMutation = gql`
  mutation LoginMutation($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      email
      username
    }
  }
`

const registerMutation = gql`
  mutation RegisterMutation($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
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
      validation: true,
      isSuccess: false,
      usernameExisted: false,
      emailExisted: false
    }
  },
  methods: {
    confirm () {
      if (this.login) {
        if (this.username === '' || this.password === '') {
          this.validation = false
        } else {
          this.validation = true
        }
      } else {
        if (this.username === '' || this.password === '' || this.email === '') {
          this.validation = false
        } else {
          this.validation = true
        }
      }
    },
    userLogin () {
      if (this.validation) {
        this.$apollo.mutate({
          mutation: loginMutation,
          variables: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          if (response.data.login) {
            // console.log(response.data.login)
            // save user token to localstorage
            localStorage.setItem(USER_TOKEN, JSON.stringify(response.data.login))
            // // redirect user
            this.$router.replace('/')
            // console.log(response.data.login)
          }
        }).catch(err => {
          if (err) {
            this.validation = false
          }
        })
      }
    },
    userRegister () {
      if (this.validation) {
        this.$apollo.mutate({
          mutation: registerMutation,
          variables: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        }).then(response => {
          // console.log(response)
          this.isSuccess = true
          this.login = true
          this.$router.replace('/authentication')
        }).catch(err => {
          if (err.message.indexOf(this.username) !== -1) {
            this.usernameExisted = true
          }
          if (err.message.indexOf(this.email) !== -1) {
            this.emailExisted = true
          }
        })
      }
    },
    submit () {
      if (this.login) {
        this.userLogin()
      } else {
        this.userRegister()
      }
    }
  }
}
</script>

<style scoped>

</style>
