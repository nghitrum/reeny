<template>
  <div class="content">
    <div class="row">
      <div class="main-area">
        <vue-post-detail :id="id"></vue-post-detail>
        <vue-comment-form :id="id" v-on:addComment="getComment($event)"></vue-comment-form>
        <vue-comment-list :id="id" :newComment="newComment"></vue-comment-list>
      </div>
    </div>
  </div>
</template>

<script>
import PostDetail from '@/components/post/PostDetail'
import CommentForm from '@/components/comments/CommentForm'
import CommentList from '@/components/comments/CommentList'

export default {
  props: ['id'],
  data () {
    return {
      newComment: ''
    }
  },
  components: {
    'vue-post-detail': PostDetail,
    'vue-comment-form': CommentForm,
    'vue-comment-list': CommentList
  },
  methods: {
    getComment (comment) {
      this.newComment = comment
    }
  }
}
</script>

<style scoped>

</style>
