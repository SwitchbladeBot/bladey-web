import Vue from 'vue'

import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCogs, faEnvelope, faLanguage, faLifeRing, faSignInAlt, faSignOutAlt, faSpinner, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCogs, faEnvelope, faGithub, faLanguage, faLifeRing, faSignInAlt, faSignOutAlt, faSpinner, faTachometerAlt)

Vue.component('fai', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
