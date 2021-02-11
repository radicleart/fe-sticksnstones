/**
 * myItemStore represents the state of the data to the Vue components
 * it is session scoped store and hands off to myItemService to access
 * permanent storage.
 */
import myItemService from '@/services/myItemService'
import { APP_CONSTANTS } from '@/app-constants'

const myItemStore = {
  namespaced: true,
  state: {
    myProfile: {
      username: null,
      loggedIn: false,
      showAdmin: false
    },
    appName: 'Risidio Mesh',
    appLogo: '/img/sticksnstones_logo.8217b8f7.png'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    initSchema ({ getters, state, commit }, forced: boolean) {
      return new Promise((resolve, reject) => {
        if (state.rootFile && !forced) {
          resolve(state.rootFile)
        } else {
          const profile = getters[APP_CONSTANTS.KEY_PROFILE]
          myItemService.fetchMyItems(profile).then((rootFile: object) => {
            commit('rootFile', rootFile)
            resolve(rootFile)
          }).catch((err) => {
            reject(err)
          })
        }
      })
    }
  }
}
export default myItemStore
