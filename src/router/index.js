import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import Homepage from '@/components/Homepage'
import LoginCallback from '@/components/LoginCallback'

Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/loginCallback',
      name: 'LoginCallback',
      component: LoginCallback
    }
  ]
})
