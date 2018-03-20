<template>
  <div>
    <p v-for="user in users" :key="user.id">{{user.email}} -- {{user.username}}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const queryAllUsers = gql`
  query allUsers {
    users {
      username
      email
    }
  }
`
export default {
  data () {
    return {
      users: []
    }
  },
  apollo: {
    // fetch all users
    users: {
      query: queryAllUsers
    }
  }
}
</script>

<style scoped>

</style>
