import axios from 'axios'

const MESH_API_PATH = process.env.VUE_APP_RISIDIO_API + '/mesh'

const assetGeneralStore = {
  namespaced: true,
  state: {
    emailData: [],
    offers: [],
    transactions: [],
    cacheState: 0
  },
  getters: {
    getTransactions: state => {
      return state.transactions
    },
    getOffers: state => {
      return state.offers
    }
  },
  mutations: {
    addRegisteredEmail (state, data) {
      state.emailData.push(data)
    },
    setCacheState (state, data) {
      state.cacheState = data
    }
  },
  actions: {
    buildCache ({ commit }) {
      return new Promise(function (resolve, reject) {
        axios.get(MESH_API_PATH + '/v2/build-cache').then((result) => {
          commit('setCacheState', result)
          resolve(result)
        }).catch((error) => {
          reject(new Error('Unable to register email: ' + error))
        })
      })
    },
    registerForUpdates ({ commit }, data: any) {
      return new Promise(function (resolve, reject) {
        axios.post(MESH_API_PATH + '/v2/register/email', data).then((result) => {
          commit('addRegisteredEmail', data)
          resolve(result)
        }).catch((error) => {
          reject(new Error('Unable to register email: ' + error))
        })
      })
    }
  }
}
export default assetGeneralStore
