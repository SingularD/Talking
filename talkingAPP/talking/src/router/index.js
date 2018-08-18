import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import homeContent from '@/components/homeContent'
import write from '@/components/write'
import user from '@/components/user'
import content from '@/components/passageContent'
import passagesList from '@/components/passagesList'
import tagPassages from '@/components/tagPassages'
import passageEdit from '@/components/passageEdit'
import search from '@/components/search'
import live from '@/components/live'
import liveContent from '@/components/liveContent'

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
    },
    {
      path: '/passagesList',
      name: 'passagesList',
      component: passagesList
    },
    {
      path: '/tagPassages/:tag',
      name: 'tagPassages',
      component: tagPassages
    },
    {
      path: '/edit/:title/time/:time',
      name: 'passageEdit',
      component: passageEdit
    },
    {
      path: '/search/:field',
      name: 'search',
      component: search
    },
    {
      path: '/live',
      name: 'live',
      component: live,
      children: [
        {
          path: 'liveContent/:title',
          name: 'liveContent',
          component: liveContent
        }
      ]
    }
  ]
})
