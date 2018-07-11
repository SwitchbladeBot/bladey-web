import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import VueResource from 'vue-resource'
import Homepage from '@/components/Homepage'
import LoginAuth from '@/components/LoginAuth'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueSession)

export default new Router({
  routes: [
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
