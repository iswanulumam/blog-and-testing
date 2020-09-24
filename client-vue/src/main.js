import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFormat from 'dateformat'

Vue.config.productionTip = false

Vue.filter('prettyDate', (value) => {
  return dateFormat(value, 'dddd, mmmm dS, yyyy')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
