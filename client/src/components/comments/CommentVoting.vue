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
const upVoteMutation = gql`
mutation upVoteMutation($id: ID) {
  commentUpVote(comment: $id){
    upVote
  }
}
`
const downVoteMutation = gql`
mutation downVoteMutation($id: ID) {
  commentDownVote(comment: $id){
    downVote
  }
}
`
export default {
  data () {
    return {
      commentId: this.id,
      upVoteCount: this.inputUpVote,
      downVoteCount: this.inputDownVote
    }
  },
  props: ['id', 'inputUpVote', 'inputDownVote'],
  methods: {
    upVote () {
      this.$apollo.mutate({
        mutation: upVoteMutation,
        variables: {
          id: this.commentId
        }
      }).then(res => {
        this.upVoteCount++ // = res.data.commentUpVote.upVote
      }).catch(err => {
        console.log(err)
      })
    },
    downVote () {
      this.$apollo.mutate({
        mutation: downVoteMutation,
        variables: {
          id: this.commentId
        }
      }).then(res => {
        this.downVoteCount++ // = res.data.commentDownVote.downVote
      }).catch(err => {
        console.log(err)
      })
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
