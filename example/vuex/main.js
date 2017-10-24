
import App from './component/app'
import store from './store'
import Vue from 'vue'

store.replaceState(window._vue_ssr_data)

const app = new Vue({
  render: h => h(App),
  store
})

app.$mount('#app')
