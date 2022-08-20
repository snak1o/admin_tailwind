import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    layout: 'DefaultLayout',
    loggedIn: false,
    images: [],
    notifications: [],
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload
    },
    setImages(state, payload) {
      state.images = payload
    },
    setNotifications(state, notifications) {
      state.notifications.push(notifications)
    },
    removeNotification(state) {
      state.notifications.shift()
    },
    setLoggedIn(state, payload) {
      state.loggedIn = payload
    }
  },
  getters: {
    layout(state) {
      return state.layout
    },
    loggedIn(state) {
      return state.loggedIn
    },
    images(state) {
      return state.images
    },
    notifications(state) {
      return state.notifications
    }
  },
  actions: {
    async updatePhotos({commit}) {
      const {data} = await axios.get('/api/v1/images/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('setImages', data)
    },
    addNotification(context, notification) {
      context.commit('setNotifications', notification)
      setTimeout(() => {
        context.commit('removeNotification')
      }, 5000)
    },
  }
})
