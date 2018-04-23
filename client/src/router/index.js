import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Post from '@/components/pages/Post'

import Authentication from '@/components/pages/Authentication'
import PostNew from '@/components/pages/PostNew'
import About from '@/components/pages/About'
import Terms from '@/components/pages/TermsOfService'
import Contact from '@/components/pages/Contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
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
      path: '/post/update/:id',
      name: 'Update Post',
      component: PostNew,
      props: true
    },
    {
      path: '/search=:search',
      name: 'Search',
      component: Home,
      props: true
    },
    {
      path: '/user=:username',
      name: 'User',
      component: Home,
      props: true
    },
    {
      path: '/about-us',
      name: 'About Us',
      component: About
    },
    {
      path: '/terms-of-service',
      name: 'Term of service',
      component: Terms
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
