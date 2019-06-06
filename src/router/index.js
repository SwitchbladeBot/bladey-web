import Vue from 'vue'
import Router from 'vue-router'
import LocalStorage from 'vue-localstorage'
import Head from 'vue-head'
import Buefy from 'buefy'

import SwitchbladeApi from '../api/VueSwitchbladeApi'

import Contributors from '../pages/Contributors'
import Commands from '../pages/Commands'
import Dashboard from '../pages/Dashboard'
import Homepage from '../pages/Homepage'
import LoginAuth from '../pages/LoginAuth'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import ServerSelector from '../pages/ServerSelector'
import ConnectionCallback from '../pages/ConnectionCallback'

Vue.use(Buefy, { defaultTooltipAnimated: true, defaultToastDuration: 3000 })

Vue.use(LocalStorage)
Vue.use(Head, { separator: '-', complement: 'Switchblade' })
Vue.use(Router)
Vue.use(SwitchbladeApi, { clientId: process.env.CLIENT_ID, redirectUri: process.env.REDIRECT_URI })

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
      path: '/connections/:connection/callback',
      name: 'ConnectionCallback',
      component: ConnectionCallback
    },
    {
      path: '/contributors',
      name: 'Contributors',
      component: Contributors
    },
    {
      path: '/commands',
      name: 'Commands',
      component: Commands
    },
    {
      path: '/dashboard',
      name: 'Select a server',
      component: ServerSelector,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})
