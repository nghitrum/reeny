<template>
  <div class="rating">
    <span class="clickable-icon" @click="upVote">
      <i class="fas fa-long-arrow-alt-up"></i>
    </span>
    <h3>{{upVoteCount - downVoteCount}}</h3>
    <span class="clickable-icon" @click="downVote">
      <i class="fas fa-long-arrow-alt-down"></i>
    </span>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { USER_TOKEN } from '@/constants/setting'

const upVoteMutation = gql`
mutation upVoteMutation($id: ID, $user: ID) {
  postUpVote(post: $id, user: $user){
    upVote
    downVote
  }
}
`
const downVoteMutation = gql`
mutation downVoteMutation($id: ID, $user: ID) {
  postDownVote(post: $id, user: $user){
    upVote
    downVote
  }
}
`

const queryPost = gql`
query getPost($input: ID!) {
  post(id: $input) {
    id
    upVotedBy {
      id
    }
    downVotedBy {
      id
    }
  }
}
`
export default {
  data () {
    return {
      postId: this.id,
      upVoteCount: this.inputUpVote,
      downVoteCount: this.inputDownVote,
      user: JSON.parse(localStorage.getItem(USER_TOKEN)),
      post: '',
      downVotePressed: false,
      upVotePressed: false
    }
  },
  apollo: {
    post: {
      query: queryPost,
      variables () {
        return {
          input: this.postId
        }
      }
    }
  },
  props: ['id', 'inputUpVote', 'inputDownVote'],
  methods: {
    upVote () {
      if (!this.upVotePressed) {
        if (this.post.upVotedBy.filter(user => user.id === this.user.id).length === 0 || this.downVotePressed) {
          this.$apollo.mutate({
            mutation: upVoteMutation,
            variables: {
              id: this.postId,
              user: this.user.id
            }
          }).then(res => {
            this.upVotePressed = true
            this.downVotePressed = false
            this.upVoteCount = res.data.postUpVote.upVote
            this.downVoteCount = res.data.postUpVote.downVote
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    downVote () {
      if (!this.downVotePressed) {
        if (this.post.downVotedBy.filter(user => user.id === this.user.id).length === 0 || this.upVotePressed) {
          this.$apollo.mutate({
            mutation: downVoteMutation,
            variables: {
              id: this.postId,
              user: this.user.id
            }
          }).then(res => {
            this.upVotePressed = false
            this.downVotePressed = true
            this.upVoteCount = res.data.postDownVote.upVote
            this.downVoteCount = res.data.postDownVote.downVote
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.rating {
  width: 50%;
  text-align: center;
}
.clickable-icon {
  cursor: pointer;
}
</style>
