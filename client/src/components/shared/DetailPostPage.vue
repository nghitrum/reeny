<template>
  <div v-if="post" class="container">
    <div class="row">
      <div class="col-1">
        <div class="rating">
          <i class="fas fa-long-arrow-alt-up"></i>
          <h3>{{post.upVote - post.downVote}} </h3>
          <i class="fas fa-long-arrow-alt-down"></i>
        </div>
      </div>
      <div class="col-5">
        <div class="col">
          <h1>{{post.title}}</h1>
        </div>
        <div class="col">posted by {{post.user.username}} </div>
      </div>
      <div class="col-6">
        <div class="col">{{post.rating}} </div>
        <div class="col">{{post.createdAt}} </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="carousel col-12 col-md-6">

        <b-carousel id="carousel" class="text-center" controls indicators :interval="4000" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

          <div v-for="image in post.images" :key="image">
            <b-carousel-slide>
              <img slot="img" :src=image>
            </b-carousel-slide>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </b-carousel>

      </div>
    </div>
    <div class="row">
      <p>{{post.content}}
        <p/>
    </div>
    <div class="row">
      <span v-for="tag in post.tags.slice(0, 5)" :key="tag.id">
        <p class="post-tag">{{tag.name}}</p>
      </span>

    </div>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'
import gql from 'graphql-tag'
const id = '5ab8cae715fe2f366c18a3af'
const queryPost = gql`
  query Post {
    post(id: "${id}") {
      id
      title
      content
      tags {
        id
        name
        count
      }
      rating
      images
      upVote
      downVote
      createdAt
      user {
        id
        username
      }
    }
  }
`
export default {
  props: ["id"],
  components: {
    'b-carousel': bCarousel,
    'b-carousel-slide': bCarouselSlide
  },
  data () {
    return {
      post: '',
      slide: 0,
      sliding: null
    }
  },
  apollo: {
    // fetch all users
    post: {
      query: queryPost
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
img {
  height: 500px !important;
  width: auto !important;
}
.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' stroke='%23777' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' stroke='%23777' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}
#carousel {
  width: 100%;
  height: 500px;
}

*:focus {
  outline: 0;
  outline: none;
}
.post-tag {
  display: inline-block;
  border-radius: 13%;
  padding: 0.2em;
  margin-right: 0.8em;
  border: 1px solid #e4e2e2;
  background: #e9e8e8;
}

.rating {
  width: 50;
  text-align: center;
}
</style>
