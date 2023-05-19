import Vue from 'vue'
import Vuex from 'vuex'
import adminStore from './adminStore'
import userStore from './userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    adminStore,
    userStore
  }
})
