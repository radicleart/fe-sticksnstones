/**
 * myItemStore represents the state of the data to the Vue components
 * it is session scoped store and hands off to myItemService to access
 * permanent storage.
 */
import searchIndexService from '@/services/searchIndexService'
import myItemService from '@/services/myItemService'
import { APP_CONSTANTS } from '@/app-constants'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const myItemStore = {
  namespaced: true,
  state: {
    rootFile: null,
    myProfile: {
      username: null,
      loggedIn: false,
      showAdmin: false
    },
    appName: 'Risidio Mesh',
    appLogo: '/img/sticksnstones_logo.8217b8f7.png'
  },
  getters: {
    getMyItems: state => {
      return (state.rootFile) ? state.rootFile.records : []
    }
  },
  mutations: {
    rootFile (state: any, rootFile: any) {
      state.rootFile = rootFile
    }
  },
  actions: {
    initSchema ({ state, commit }, forced: boolean) {
      return new Promise((resolve) => {
        const profile = store.getters[APP_CONSTANTS.KEY_PROFILE]
        if (state.rootFile && !forced) {
          resolve(state.rootFile)
        } else {
          myItemService.fetchMyItems(profile).then((rootFile: object) => {
            commit('rootFile', rootFile)
            resolve(rootFile)
          }).catch(() => {
            myItemService.initItemSchema(profile).then((rootFile: object) => {
              commit('rootFile', rootFile)
              resolve(rootFile)
            })
          })
        }
      })
    },
    fetchItems ({ state }, itemUUID: string) {
      return new Promise((resolve, reject) => {
        const profile = store.getters[APP_CONSTANTS.KEY_PROFILE]
        myItemService.fetchMyItems(profile).then((rootFile: any) => {
          resolve(rootFile.records)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    findItemByUUID ({ state }, itemUUID: string) {
      return new Promise((resolve) => {
        const index = state.rootFile.records.findIndex((o) => o.itemUUID === itemUUID)
        resolve(state.rootFile.records[index])
      })
    },
    saveItem ({ state, commit }: any, data: any) {
      return new Promise((resolve, reject) => {
        if (!data.coverImage || !data.item.owner || !data.musicFile ||
          !data.item.name ||
          !data.item.description) {
          console.log(data.musicFile)
          console.log(data.coverImage)
          reject(new Error('Unable to save your data...'))
          return
        }
        myItemService.uploadMusicData(data.item.filename, data.musicFile).then((gaiaUrl: string) => {
          const item = data.item
          item.logo = data.coverImage
          item.domain = location.hostname
          item.imageUrl = gaiaUrl
          item.objType = 'multi-media'
          item.updated = moment({}).valueOf()
          const index = state.rootFile.records.findIndex((o) => o.itemUUID === item.itemUUID)
          if (index < 0) {
            item.itemUUID = uuidv4()
            state.rootFile.records.splice(0, 0, item)
          } else {
            state.rootFile.records.splice(index, 1, item)
          }
          myItemService.saveItem(state.rootFile).then((rootFile) => {
            commit('rootFile', rootFile)
            resolve(item)
            if (!item.private) {
              searchIndexService.addRecord(item).then((result) => {
                console.log(result)
              }).catch((error) => {
                console.log(error)
              })
            }
          }).catch((error) => {
            reject(error)
          })
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default myItemStore
