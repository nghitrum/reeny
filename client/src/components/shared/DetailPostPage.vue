<template>
  <div>
    <div class="heading-container">
      <div>
        <div class="votes">
          {{post.rating}}
        </div>
        <div>
          <div class="title">
            {{post.title}}
          </div>
          <div>
            posted by {{post.user}}
          </div>
        </div>
      </div>
      <div>
        <div>{{post.rating}} </div>
        <div>{{post.createdAt}} </div>
      </div>
    </div>

    <div class="picture-container">{{post.images}} </div>
    <div class="text-body">{{post.content}} </div>
    <div>{{post.tags}} </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const id = '5ab8a712fa0c443628c8db64'
const queryPost = gql`
  query Post($id: String!) {
    post(id: ${id}) {
      title
      content
      tags
      rating
      createdAt
      user
    }
  }
`
export default {
  data () {
    return {
      post: ''
    }
  },
  apollo: {
    // fetch all users
    post: {
      query: queryPost
    }
  }
}
</script>

<style scoped>

</style>
