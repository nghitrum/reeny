<template>
	<div class="rating">
		<i class="fas fa-long-arrow-alt-up" @click="plusVote"></i>
		<h3>{{post.upVote - post.downVote}}</h3>
		<i class="fas fa-long-arrow-alt-down" @click="minusVote"></i>
	</div>
</template>

<script>
import gql from 'graphql-tag'
const queryAllPosts = gql`
query allPosts {
    posts {
      id
      upVote
      downVote
    }
  }
`
const mutation = gql`
  mutation downVoteMutation($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      email
      username
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
		plusVote () {
			
		},
		minusVote () {

		}
	},
	apollo: {
		// fetch all users
		posts: {
			query: queryAllPosts
		}
	}
}
</script>

<style scoped>
.rating {
  width: 50%;
  text-align: center;
}
</style>