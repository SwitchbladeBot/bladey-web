import Vue from 'vue'

import App from './App'
import router from './router'

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Vue.config.productionTip = false

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
