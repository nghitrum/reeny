import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'

import Authentication from '@/components/Authentication'
import NewPost from '@/components/NewPost'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/posts/new',
      name: 'New Post',
      component: NewPost
    }
  ]
})
