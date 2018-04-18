<template>
  <div class="post-area" v-if="posts">
    <div class="row rounded border m-3 post" v-for="post in posts" :key="post.id">
      <div class="col-1 border-right bg-light">
        <div class="mx-auto-m">
          <vue-post-voting :id="post.id" :inputUpVote="post.upVote" :inputDownVote="post.downVote"></vue-post-voting>
        </div>
      </div>
      <div class="d-none d-sm-flex col-11 col-sm-3 image-column">
        <div class="image-container">
          <img v-bind:src="post.images[0]">
        </div>
      </div>
      <div class="col-10 col-sm-8 title-column py-3 ">
        <div class="title-and-stars ">
          <div class="row ">
            <div class="col-12 col-md-8 ">
              <h3 class="post-title ">
                <router-link :to="{ name: 'Post', params: { id: post.id }} ">{{post.title}}</router-link>
              </h3>
              <p v-if="post.user ">
                by
                <router-link :to="{ name: 'User', params: { username: post.user.username }} ">
                  {{post.user.username}}
                </router-link>
              </p>
            </div>
            <div class="col-12 col-md-4 text-sm-left text-md-right mb-3 ">
              <div class="stars ">
                <div class="full-stars ">
                  <span v-for="item in (post.rating) " :key="item.id " style="color: orange; ">
                    <i class="fas fa-star "></i>
                  </span>
                </div>
                <div class="empty-stars ">
                  <span v-for="item in (5 - post.rating) " :key="item.id " style="color: lightgray; ">
                    <i class="fas fa-star "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tags">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col">
                  <router-link :to="{ name: 'Search', params: { search: tag.name }}" class="badge badge-secondary badge-lg mr-1 mt-1" v-for="tag in post.tags.slice(0, 5)" :key="tag.id">{{tag.name}}</router-link>
                  <router-link :to="{ name: 'Post', params: { id: post.id }}" class="badge badge-dark badge-lg mr-1 mt-1" v-show="post.tags.length > 5">...</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="timeline mt-3">
          <div v-if="post.updatedAt" class="time">
            posted on {{post.createdAt.slice(3,25)}}
          </div>
          <div v-else>
            updated on {{post.updatedAt.slice(0,25)}}
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
.post-title a {
  text-decoration: none;
  color: black;
  font-size: 1em;
  font-weight: 300;
}
.post-title a:hover {
  box-shadow: 0px 1px black;
}
.image-column {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.image-container img {
  width: 100%;
  height: 100%;
  max-width: 14em;
}

.post-tag {
  display: inline-block;
  border-radius: 13%;
  padding: 1%;
  margin-right: 3%;
  border: 1px solid #e4e2e2;
  background: #e9e8e8;
}

.title-column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title-and-stars {
  flex: 0 1 auto;
}
.tags {
  flex: 1 1 auto;
}
</style>
