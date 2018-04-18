<template>
  <div class="rating">
    <span class="clickable-icon" @click="upVote">
      <i class="fas fa-sort-up"></i>
    </span>
    <h3>{{upVoteCount - downVoteCount}}</h3>
    <span class="clickable-icon" @click="downVote">
      <i class="fas fa-sort-down"></i>
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
    getNewData () {
      this.$apollo.queries.post.refetch()
    },
    upVote () {
      // console.log(this.upVotePressed)
      // console.log(this.user.id)

      // check if this user is already upvoted
      let count = this.post.upVotedBy.filter((ele) => {
        return ele.id === this.user.id
      }).length

      // console.log(count)
      if (count > 0) {
        this.upVotePressed = true
        this.downVotePressed = false
      }

      if (this.upVotePressed === false) {
        // console.log('inside upvote')

        this.$apollo.mutate({
          mutation: upVoteMutation,
          variables: {
            id: this.postId,
            user: this.user.id
          }
        }).then(res => {
          // console.log('after upvote')
          this.upVotePressed = true
          this.downVotePressed = false
          this.upVoteCount = res.data.postUpVote.upVote
          this.downVoteCount = res.data.postUpVote.downVote
          this.getNewData()
        }).catch(err => {
          console.log(err)
        })
      }

      // console.log(this.upVotePressed)
    },
    downVote () {
      // console.log(this.downVotePressed)

      // check if this user is already upvoted
      let count = this.post.downVotedBy.filter((ele) => {
        return ele.id === this.user.id
      }).length
      // console.log(count)

      if (count > 0) {
        this.downVotePressed = true
        this.upVotePressed = false
      }

      if (this.downVotePressed === false) {
        // console.log('inside downvote')

        this.$apollo.mutate({
          mutation: downVoteMutation,
          variables: {
            id: this.postId,
            user: this.user.id
          }
        }).then(res => {
          // console.log('after downvote')
          this.upVotePressed = false
          this.downVotePressed = true
          this.upVoteCount = res.data.postDownVote.upVote
          this.downVoteCount = res.data.postDownVote.downVote
          this.getNewData()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
.rating {
  text-align: center;
}
.clickable-icon {
  cursor: pointer;
  font-size: 3em;
  line-height: 0;
}
</style>
