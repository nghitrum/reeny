import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import post from '@/components/shared/DetailPostPage'

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
      path: '/post',
      name: 'posttest',
      component: post
    }
  ]
})
