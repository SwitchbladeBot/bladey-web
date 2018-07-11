import Vue from 'vue'
import Router from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import Homepage from '@/components/Homepage'
import LoginAuth from '@/components/LoginAuth'

Vue.use(Router)
Vue.use(VueLocalStorage)

export default new Router({
  mode: 'history',
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
