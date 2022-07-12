import { createStore } from 'vuex'

export default createStore({
  state: {
    layout: 'DefaultLayout'
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload
    }
  },
  getters: {
    layout(state) {
      return state.layout
    }
  },
  actions: {
  }
})
