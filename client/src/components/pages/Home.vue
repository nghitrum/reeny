<template>
  <div>
    <div v-show="search">
      <div class="row">
        <div class="col">
          <div class="col mt-3">
            <h3 class="search-for" v-if="posts.length == 0">No results for &#34;{{search}}&#34;.</h3>
            <h3 class="search-for" v-else>Results for &#34;{{search}}&#34;&#58;</h3>
          </div>
        </div>
      </div>
    </div>
    <vue-post-list :postList="posts"></vue-post-list>
  </div>

</template>

<script>
import PostList from '@/components/post/PostList'
import gql from 'graphql-tag'

const queryAllPosts = gql`
query allPosts {
    posts {
      id
      title
      images
      upVote
      downVote
      createdAt
      updatedAt
      rating
      user {
        id
        username
      }
      tags {
        id
        name
      }
    }
  }
`

const querySearch = gql`
query searchQuery($searchInput: String) {
  searchPosts(input: $searchInput){
    id
    title
    images
    upVote
    downVote
    createdAt
    updatedAt
    rating
    user {
      id
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
  props: ['search'],
  data () {
    return {
      posts: [],
      query: ''
    }
  },
  apollo: {
    posts: {
      query () {
        if (this.search) {
          return querySearch
        } else {
          return queryAllPosts
        }
      },
      update: data => data.searchPosts || data.posts,
      variables () {
        return {
          searchInput: this.search
        }
      }
    }
  },
  components: {
    'vue-post-list': PostList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-for {
  font-weight: 440;
  font-size: 2em;
}
</style>
