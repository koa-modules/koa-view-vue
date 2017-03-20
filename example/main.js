
import App from './component/app'

import Vue from 'vue'

const app = new Vue({
  ...App,
  data() {
    return {
      ...window._vue_ssr_data_
    }
  }
})

app.$mount('#app')
