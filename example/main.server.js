
import App from './component/app'

import Vue from 'vue'

const app = new Vue(App)

export default function(context) {
  return new Promise((resolve, reject) => {
    resolve(app)
  })
}
