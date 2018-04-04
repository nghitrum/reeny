<template>
	<div class="rating">
		<i class="fas fa-long-arrow-alt-up" @click="upVote"></i>
		<h3>{{post.upVote - post.downVote}}</h3>
		<i class="fas fa-long-arrow-alt-down" @click="downVote"></i>
	</div>
</template>

<script>
import gql from 'graphql-tag'

const upVoteMutation = gql`
  mutation upVoteMutation($username: String, $password: String) {
    postUpVote(post: post.id) {
      upVote
    }
  }
`

const downVoteMutation = gql`
  mutation downVoteMutation($username: String, $password: String) {
    postDownVote(post: post.id) {
      downVote
    }
  }
`
export default {
	data () {
		return {
			posts: []
		}
	},
	methods: {
		upVote () {
			this.apollo.mutate({
				mutation: postDownVote
			})
		}
	},
	downVote () {
		this.apollo.mutate({
			mutation: postDownVote
		})
	}
}

</script>

<style scoped>
.rating {
  width: 50%;
  text-align: center;
}
</style>