import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from 'vue-localstorage'
import Meta from 'vue-meta'
import Buefy from 'buefy'

import DiscordOAuth from '../oauth/VueDiscordOAuth'

import Homepage from '../pages/Homepage'
import Dashboard from '../pages/Dashboard'
import LoginAuth from '../pages/LoginAuth'
import Contributors from '../pages/Contributors'
import ServerSelector from '../pages/ServerSelector'
import NotFound from '../pages/NotFound'

Vue.use(Buefy)
Vue.use(DiscordOAuth)
Vue.use(LocalStorage)
Vue.use(Meta)
Vue.use(Router)

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
    },
    {
      path: '/dashboard',
      name: 'Select a server',
      component: ServerSelector
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/contributors',
      name: 'Contributors',
      component: Contributors
    }
  ]
})
