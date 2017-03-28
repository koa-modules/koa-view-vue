
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count = payload
    }
  },
  actions: {
    setCount({ commit }, payload) {
      commit('SET_COUNT', payload)
    }
  }
})

export default store
