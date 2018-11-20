import '@babel/polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import client from './plugins/client'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(client)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

