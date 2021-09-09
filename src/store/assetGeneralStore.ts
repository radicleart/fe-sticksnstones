import axios from 'axios'

const MESH_API_PATH = process.env.VUE_APP_RISIDIO_API + '/mesh'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

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
    cacheUpdate ({ dispatch }, data) {
      return new Promise(function () {
        const cacheUpdate = {
          type: 'token',
          functionName: data.functionName || 'general',
          nftIndex: (data.nftIndex) ? Number(data.nftIndex) : null,
          assetHash: data.assetHash,
          contractId: STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME
        }
        dispatch('rpayStacksContractStore/updateCache', cacheUpdate, { root: true })
      })
    },
    buildCache ({ commit }) {
      return new Promise(function (resolve, reject) {
        axios.get(MESH_API_PATH + '/v2/build-cache/' + STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME).then((result) => {
          commit('setCacheState', result.data)
          resolve(result.data)
        }).catch((error) => {
          reject(new Error('Unable to register email: ' + error))
        })
      })
    },
    buildSearchIndex ({ commit }) {
      return new Promise(function (resolve) {
        axios.get(MESH_API_PATH + '/v2/gaia/indexFiles/' + STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME).then((result) => {
          commit('setCacheState', result.data)
          resolve(result.data)
        }).catch((error) => {
          resolve(new Error('Unable to build search index: ' + error))
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
