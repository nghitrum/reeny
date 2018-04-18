<template>
  <div v-if="post" class="post-area">
    <div class="row m-3">
      <div class="col">
        <div class="row rounded border">
          <div class="col-1 border-right bg-light py-3">
            <div class="mx-auto-m">
              <vue-post-voting :id="post.id" :inputUpVote="post.upVote" :inputDownVote="post.downVote"></vue-post-voting>
            </div>
          </div>
          <div class="col-10 col-md-11 py-3">
            <div class="row">
              <div class="col-12 col-md-7">
                <h1 class="post-title">{{post.title}}</h1>
              </div>
              <div class="col-12 col-md-5 text-md-right">
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
            <div class="row post-by-and-time">
              <div class="col-12 col-sm-6">posted by
                <router-link :to="{ name: 'User', params: { username: post.user.username }}">{{post.user.username}}</router-link>
              </div>
              <div class="col-12 col-sm-6 text-right">
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
        <div class="row rounded border my-3 d-flex justify-content-center">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" v-for="(image, index) in post.images" :key="index" :data-slide-to="index" v-bind:class="index == 0 ? 'active' : ''"></li>
            </ol>
            <div class="carousel-inner h-100">
              <div class="h-100" v-for="(image, index) in post.images" :key="index" v-bind:class="index == 0 ? 'carousel-item active' : 'carousel-item'">
                <div class="h-100 d-flex justify-content-center align-items-center">
                  <img class="img-fluid" :src=image>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="row rounded border my-3">
          <div class="col py-3">
            <div class="row">
              <div class="col">
                <p>
                  {{post.content}}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <router-link :to="{ name: 'Search', params: { search: tag.name }}" class="badge badge-secondary badge-lg mr-1 mt-1" v-for="tag in post.tags" :key="tag.id">{{tag.name}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'
import gql from 'graphql-tag'
import PostVoting from './PostVoting'

const queryPost = gql`
query getPost($input: ID!) {
  post(id: $input) {
    id
    title
    content
    tags {
      id
      name
      count
    }
    user {
      id
      username
    }
    rating
    images
    upVote
    downVote
    createdAt
    updatedAt
  }
}
`

export default {
  props: ['id'],
  components: {
    'b-carousel': bCarousel,
    'b-carousel-slide': bCarouselSlide,
    'vue-post-voting': PostVoting
  },
  data () {
    return {
      postId: this.id,
      post: '',
      slide: 0,
      sliding: null
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
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
.post-by-and-time {
  align-self: flex-end;
}

#carouselExampleIndicators {
  width: 100%;
  height: 400px;
}
.carousel-control-prev-icon {
  background-size: 2em;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}

.carousel-control-next-icon {
  background-size: 2em;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
img {
  max-height: 400px !important;
  width: auto !important;
}
</style>
