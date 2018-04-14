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
  commentUpVote(comment: $id, user: $user){
    upVote
    downVote
  }
}
`
const downVoteMutation = gql`
mutation downVoteMutation($id: ID, $user: ID) {
  commentDownVote(comment: $id, user: $user){
    upVote
    downVote
  }
}
`
const queryComment = gql`
query getComment($input: ID!) {
  comment(id: $input) {
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
      upVoteCount: this.inputUpVote,
      downVoteCount: this.inputDownVote,
      user: JSON.parse(localStorage.getItem(USER_TOKEN)),
      comment: '',
      downVotePressed: false,
      upVotePressed: false
    }
  },
  apollo: {
    comment: {
      query: queryComment,
      variables () {
        return {
          input: this.id
        }
      }
    }
  },
  props: ['id', 'inputUpVote', 'inputDownVote'],
  methods: {
    upVote () {
      if (!this.upVotePressed) {
        if (this.comment.upVotedBy.filter(user => user.id === this.user.id).length === 0 || this.downVotePressed) {
          this.$apollo.mutate({
            mutation: upVoteMutation,
            variables: {
              id: this.id,
              user: this.user.id
            }
          }).then(res => {
            this.upVotePressed = true
            this.downVotePressed = false
            this.upVoteCount = res.data.commentUpVote.upVote
            this.downVoteCount = res.data.commentUpVote.downVote
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    downVote () {
      if (!this.downVotePressed) {
        if (this.comment.downVotedBy.filter(user => user.id === this.user.id).length === 0 || this.upVotePressed) {
          this.$apollo.mutate({
            mutation: downVoteMutation,
            variables: {
              id: this.id,
              user: this.user.id
            }
          }).then(res => {
            this.upVotePressed = false
            this.downVotePressed = true
            this.upVoteCount = res.data.commentDownVote.upVote
            this.downVoteCount = res.data.commentDownVote.downVote
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
