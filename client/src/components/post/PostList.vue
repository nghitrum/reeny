<template>
  <div class="post-area" v-if="posts">
    <div class="container-fluid" v-for="post in posts" :key="post.id">
      <div class="row post border rounded">

        <div class="col-2 col-lg-1">
          <div class="mx-auto-m">
            <vue-post-voting :id="post.id" :inputUpVote="post.upVote" :inputDownVote="post.downVote"></vue-post-voting>
          </div>
        </div>

        <div class="col-10 col-lg-3 image-column">
          <div class="image-container">
            <img v-bind:src="post.images[0]">
          </div>
        </div>

        <div class="col-12 col-lg-8 title-column">

          <div class="row">
            <div class="col-12 col-md-8">
              <router-link :to="{ name: 'Post', params: { id: post.id }}">
                <h3 class="post-title">{{post.title}}</h3>
              </router-link>
              <p v-if="post.user">
                By
                <a href="#">{{post.user.username}}</a>
              </p>
            </div>
            <div class="col-12 col-md-4">
              <div class="stars">
                <div class="full-stars">
                  <span v-for="item in (post.rating)" :key="item.id" style="color: orange;">
                    <i class="fas fa-star"></i>
                  </span>
                </div>
                <div class="empty-stars">
                  <span v-for="item in (5 - post.rating)" :key="item.id" style="color: lightgray;">
                    <i class="fas fa-star"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-sm-6">
              <span v-for="tag in post.tags.slice(0, 5)" :key="tag.id">
                <a href="#">
                  <p class="post-tag">{{tag.name}}</p>
                </a>
              </span>
            </div>
            <div class="col-12 col-sm-6 time">
              <div v-if="post.updatedAt">
                <p>Posted on {{post.createdAt.slice(0,25)}}</p>
              </div>
              <div v-else>
                <p>Updated on {{post.updatedAt.slice(0,25)}}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PostVoting from './PostVoting'
export default {
  data () {
    return {
      posts: this.postList
    }
  },
  watch: {
    postList () {
      this.posts = this.postList
    }
  },
  components: {
    'vue-post-voting': PostVoting
  },
  props: ['postList']
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
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
  margin-top: 1.2em;
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
  width: 50%;
  text-align: center;
}
.stars {
  margin-top: 0.3em;
}
.fa-star {
  font-size: 1.4em;
}
.empty-stars,
.full-stars {
  display: inline;
}
.empty-stars {
  margin-left: -0.27em;
}
.post-title {
  font-weight: 420;
}

/* .time {
  text-align: right;
} */

@media screen and (max-width: 600px) {
  .image-column {
    padding-bottom: 1em;
  }
}
</style>
