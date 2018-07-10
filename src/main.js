import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCode, faEnvelope, faLifeRing, faSignInAlt, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCode, faEnvelope, faLifeRing, faSignInAlt, faSignOutAlt, faTachometerAlt)

Vue.component('fai', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
