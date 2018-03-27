<template>
  <div class="post-area" v-if="posts">
    <div class="container-fluid post" v-for="post in posts" :key="post.id">
      <div class="row">

        <div class="col-2 col-lg-2">
          <div class="mx-auto-m">
            <div class="rating">
              <i class="fas fa-long-arrow-alt-up"></i>
              <h3>{{post.rating}}</h3>
              <i class="fas fa-long-arrow-alt-down"></i>
            </div>
          </div>
        </div>

        <div class="col-10 col-lg-3 image-column">
          <div class="image-container">
            <img v-bind:src="post.images[0]">
          </div>
        </div>

        <div class="col-12 col-lg-7 title-column">

          <div class="row">
            <div class="col-12 col-md-8">
              <a href="#">
                <h3>{{post.title}}</h3>
              </a>
              <p v-if="post.user">By {{post.user.username}}</p>
            </div>
            <div class="col-12 col-md-4">
              <p>Stars are supposed to go here</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-sm-6">
              <span v-for="tag in post.tags.slice(0, 5)" :key="tag.id">
                <p class="post-tag">{{tag.name}}</p>
              </span>
            </div>
            <div class="col-12 col-sm-6">
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
.image-container {
 min-width: 10em;
}
.image-container img {
  width: 100%;
  max-width: 14em;
}
.post {
  /* border: 1px solid red; */
  font-size: 0.9em;
}
.post-tag {
  display: inline-block;
  border-radius: 13%;
  padding: 1%;
  margin-right: 3%;
  border: 1px solid #e4e2e2;
  background: #e9e8e8;
}
.mx-auto-m {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rating {
  width:50;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .image-column {
    padding-bottom: 1em;
  }
}
</style>
