<template>
  <div class="container">
    <div class="row my-3 mx-1 comment border border-primary rounded" v-for="comment in tempComments" :key="comment.id">
      <div class="col-1">
        <div class="rating">
          <i class="fas fa-long-arrow-alt-up"></i>
          <h3>{{comment.upVote - comment.downVote}} </h3>
          <i class="fas fa-long-arrow-alt-down"></i>
        </div>
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
      tempComments: [],
      comment: this.newComment
    }
  },
  watch: {
    newComment () {
      this.tempComments.unshift(this.newComment)
    }
  },
  apollo: {
    comments: {
      query: queryComments,
      variables () {
        return {
          id: this.postId
        }
      },
      update (data) {
        data.comments.forEach(com => {
          this.tempComments.push(com)
        })
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
