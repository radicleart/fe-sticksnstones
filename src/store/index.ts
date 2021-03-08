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
import contentStore from './contentStore'
import publicItemsStore from './publicItemsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contentStore,
    myItemStore,
    authStore,
    publicItemsStore
  },
  state: {
    windims: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
    modalMessage: 'Your request is being processed'
  },
  getters: {
    getInnerWidth: state => {
      return (state.windims.innerWidth)
    },
    getModalMessage: state => {
      return state.modalMessage
    }
  },
  mutations: {
    setModalMessage (state, modalMessage) {
      state.modalMessage = modalMessage
    },
    setWinDims (state) {
      state.windims = {
        innerWidth: window.innerWidth, innerHeight: window.innerHeight
      }
    }
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
