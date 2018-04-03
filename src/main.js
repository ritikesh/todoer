import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.css'

import store from './store'

Vue.use(Vuetify)

const unsync = sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
