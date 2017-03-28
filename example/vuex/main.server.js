
import App from './component/app'
import store from './store'
import Vue from 'vue'

export default function(context) {
  return new Promise((resolve, reject) => {
    const { data } = context

    store.replaceState(data)

    const app = new Vue({
      ...App,
      store
    })

    resolve(app)
  })
}
