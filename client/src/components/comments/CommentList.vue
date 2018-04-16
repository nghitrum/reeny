<template>
  <div class="container">
    <div class="row my-3 mx-1 comment border border-primary rounded" v-for="comment in comments" :key="comment.id">
      <div class="col-1">
        <vue-comment-voting :id="comment.id" :inputUpVote="comment.upVote" :inputDownVote="comment.downVote"></vue-comment-voting>
      </div>
      <div class="col-11">
        <div class="row align-items-start">
          <div class="col">{{comment.content}}</div>
        </div>

        <div class="row justify-content-between mt-3">
          <div class="col-6">
            Posted by {{comment.user.username}}
          </div>
          <div class="col-6 text-right">
            {{comment.createdAt.slice(0,25)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import CommentVoting from './CommentVoting'

const queryComments = gql`
  query Comments($id: ID) {
    comments(post: $id) {
      id
      content
      upVote
      downVote
      createdAt
      user {
        id
        username
      }
    }
  }
`

export default {
  props: ['id', 'newComment'],
  data () {
    return {
      postId: this.id,
      comments: [],
      comment: this.newComment
    }
  },
  components: {
    'vue-comment-voting': CommentVoting
  },
  watch: {
    newComment () {
      this.$apollo.queries.comments.refetch()
    }
  },
  apollo: {
    comments: {
      query: queryComments,
      variables () {
        return {
          id: this.postId
        }
      }
    }
  }
}
</script>

<style scoped>
.comment {
  width: 65em;
}
</style>
