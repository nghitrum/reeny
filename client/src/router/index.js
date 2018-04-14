import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Post from '@/components/pages/Post'

import Authentication from '@/components/pages/Authentication'
import PostNew from '@/components/pages/PostNew'

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
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/posts/new',
      name: 'New Post',
      component: PostNew
    },
    {
      path: '/tag/name',
      name: 'Tag'
    }
  ]
})
