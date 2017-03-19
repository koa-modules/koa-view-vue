
import App from './component/app'

import Vue from 'vue'

const app = new Vue({
  ...App,
  data() {
    return {
      fooCount: 69,
      barCount: 68,
      count: 67
    }
  }
})

app.$mount('#app')
