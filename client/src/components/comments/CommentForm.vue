<template>
  <div v-if="user">
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-show="!comment && isSubmmitted">
      <strong>Content</strong> is required.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form class="form">
      <div class="form-group">
        <label for="exampleTextarea">Post a comment:</label>
        <div class="row">
          <div class="col">
            <textarea class="form-control" id="reply" method="post" v-model="comment" rows="3" charswidth="23" autofocus></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-outline-primary float-right mt-3" @click="addComment">Submit</button>
          </div>
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
      isSubmmitted: false,
      comment: '',
      user: JSON.parse(localStorage.getItem(USER_TOKEN))
    }
  },
  methods: {
    addComment () {
      this.isSubmmitted = true
      if (this.comment) {
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
}
</script>

<style scoped>
#reply {
  resize: vertical;
}
</style>
