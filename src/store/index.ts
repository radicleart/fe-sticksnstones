/**
 * This store represents the state of the (session scoped) data in the Vue
 * application. This is the data the Vue components can access reactively
 * to present to users. The Vuex Store has a modular composition and the store
 * modules hand off to services to interface with permanent data storage.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './authStore'
import myItemStore from './myItemStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    myItemStore,
    authStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
    initApplication ({ dispatch }) {
      return new Promise(resolve => {
        dispatch('authStore/fetchMyAccount').then(profile => {
          if (profile.loggedIn) {
            dispatch('myItemStore/initSchema').then(rootFile => {
              resolve(rootFile)
            })
          }
        })
      })
    }
  }
})
