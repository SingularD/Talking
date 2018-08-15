import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import homeContent from '@/components/homeContent'
import write from '@/components/write'
import user from '@/components/user'
import content from '@/components/passageContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      name: 'homeContent',
      component: homeContent
    },
    {
      path: '/write',
      name: 'write',
      component: write
    },
    {
      path: '/user/:id',
      name: 'user',
      component: user,
      children: [
        {
          path: 'content/:title/time/:time',
          name: 'content',
          component: content
        }
      ]
    }
  ]
})
