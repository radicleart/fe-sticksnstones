import searchIndexService from '@/services/searchIndexService'

const publicItemsStore = {
  namespaced: true,
  state: {
    details: null
  },
  getters: {
    getPublicItems: state => {
      return (state.details) ? state.details : []
    }
  },
  actions: {
    fetchPublicItems ({ commit }) {
      return new Promise((resolve, reject) => {
        searchIndexService.fetchAllNamesIndex().then((details) => {
          resolve(details)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default publicItemsStore
