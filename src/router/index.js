import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from 'vue-localstorage'
import Meta from 'vue-meta'
import Homepage from '@/components/Homepage'
import NotFound from '@/components/NotFound'
import LoginAuth from '@/components/LoginAuth'

Vue.use(Router)
Vue.use(LocalStorage)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/auth',
      name: 'LoginAuth',
      component: LoginAuth
    }
  ]
})
