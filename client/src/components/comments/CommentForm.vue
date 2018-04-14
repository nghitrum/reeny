<template>
  <div class="container" v-if="user">
    <form class="form">
      <div class="form-group">
        <label for="exampleTextarea">Reply:</label>
        <div class="form-inline">
          <textarea class="form-control" id="reply" method="post" v-model="comment" cols="120" rows="3" charswidth="23"></textarea>
          <button type="button" class="btn btn-outline-primary ml-5 align-self-start" @click="addComment">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { USER_TOKEN } from '@/constants/setting'

const commentMutation = gql`
mutation commentMutation($content: String, $user: ID, $post: ID) {
  addComment(content: $content, user: $user, post: $post) {
    id
    content
    upVote
    downVote
    createdAt
    user {
      id
      username
    }
    post {
      id
    }
  }
}
`
export default {
  props: ['id'],
  data () {
    return {
      comment: '',
      user: JSON.parse(localStorage.getItem(USER_TOKEN))
    }
  },
  methods: {
    addComment () {
      this.$apollo.mutate({
        mutation: commentMutation,
        variables: {
          content: this.comment,
          user: this.user.id,
          post: this.id
        }
      }).then(res => {
        this.comment = ''
        this.$emit('addComment', res.data.addComment)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#reply {
  resize: vertical;
}
</style>
