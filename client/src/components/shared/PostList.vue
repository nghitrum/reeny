<template>
  <div class="post-area">
    <div v-for="post in posts" :key="post.id">
      <div class="post">
        <div class="column">
          <i class="fab fa-angle-up"></i>
          <h3>{{post.rating}}</h3>
          <i class="fab fa-angle-down"></i>
        </div>
        <div class="column image-column">
          <img v-bind:src="post.images[0]">
        </div>
        <div class="column title-column">
          <div>
            <a href="#">
              <h3>{{post.title}}</h3>
            </a>
            <p>By {{post.user.username}}</p>
          </div>
          <div>
            <span v-for="tag in post.tags" :key="tag.id">
              {{tag.name}}
            </span>
          </div>
        </div>
        <div class="column">
          <div v-if="post.updatedAt">
            <p>{{post.createdAt}}</p>
          </div>
          <div v-else>
            <p>{{post.updatedAt}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const queryAllPosts = gql`
query allPosts {
    posts {
      title
      images
      createdAt
      updatedAt
      rating
      user {
        username
      }
      tags {
        id
        name
      }
    }
  }
`
export default {
  data () {
    return {
      posts: []
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
.post {
  height: 10%;
  display: flex;
  flex-direction: row;
}
.column {
  height: 100%;
  flex-grow: 1;
}
.image-column {
  width: 15%;
  min-width: 10%;
  flex-basis: auto;
}
.title-column {
  flex-grow: 2;
}
.image-column img {
  width: 100%;
}
</style>
