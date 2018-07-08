import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import LoginLoading from '@/components/LoginLoading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/loginCallback#/:params',
      name: 'LoginLoading',
      component: LoginLoading
    }
  ]
})
// http://localhost:8080/loginCallback#/access_token=aoc5rreHXHLJDTyq2f2qZJqDJysDGt&token_type=Bearer&expires_in=604800&scope=identify+guilds
