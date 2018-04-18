<template>
  <div>
    <div class="row border rounded m-3 comment" v-for="comment in comments" :key="comment.id">
      <div class="col-1 border-right bg-light">
        <div class="mx-auto-m">
          <vue-comment-voting :id="comment.id" :inputUpVote="comment.upVote" :inputDownVote="comment.downVote"></vue-comment-voting>
        </div>
      </div>
      <div class="col-11">
        <div class="row">
          <div class="col">
            <span>
              <strong>{{comment.user.username}}</strong>
            </span>
            &#8212;
            <span>{{comment.createdAt.slice(0,25)}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            {{comment.content}}
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

</style>
