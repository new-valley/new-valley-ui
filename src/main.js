import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import client from './plugins/client'

Vue.config.productionTip = false

Vue.use(client)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

