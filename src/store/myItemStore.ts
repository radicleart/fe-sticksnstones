/**
 * myItemStore represents the state of the data to the Vue components
 * it is session scoped store and hands off to myItemService to access
 * permanent storage.
 */
import searchIndexService from '@/services/searchIndexService'
import myItemService from '@/services/myItemService'
import { APP_CONSTANTS } from '@/app-constants'
import store from '@/store'
import moment from 'moment'
import utils from '@/services/utils'

const getFileExtension = function (filename) {
  const index = filename.lastIndexOf('.')
  return filename.substring(index)
}

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
    fetchItems ({ commit }) {
      return new Promise((resolve, reject) => {
        const profile = store.getters[APP_CONSTANTS.KEY_PROFILE]
        myItemService.fetchMyItems(profile).then((rootFile: any) => {
          commit('rootFile', rootFile)
          resolve(rootFile.records)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    findItemByAssetHash ({ state }, assetHash: string) {
      return new Promise((resolve) => {
        const index = state.rootFile.records.findIndex((o) => o.assetHash === assetHash)
        resolve(state.rootFile.records[index])
      })
    },
    saveItem ({ state, commit }: any, data: any) {
      return new Promise((resolve, reject) => {
        const item = data.item
        const profile = store.getters[APP_CONSTANTS.KEY_PROFILE]
        item.owner = profile.username
        if (!item.creatorDID) item.creatorDID = item.owner
        if (!data.coverImage || !item.owner || !data.musicFile ||
          !item.name ||
          !item.description) {
          console.log(data.musicFile)
          console.log(data.coverImage)
          reject(new Error('Unable to save your data...'))
          return
        }
        const assetHash = utils.buildHash(data.musicFile.dataUrl)
        item.assetHash = assetHash
        const musicFileName = assetHash + getFileExtension(data.musicFile.name)
        const coverImageFileName = assetHash + getFileExtension(data.coverImage.name)

        myItemService.uploadFileData(coverImageFileName, data.coverImage).then((gaiaUrl: string) => {
          item.imageUrl = gaiaUrl
          myItemService.uploadFileData(musicFileName, data.musicFile).then((gaiaUrl: string) => {
            item.musicFileUrl = gaiaUrl
            item.domain = location.hostname
            item.objType = 'music'
            item.updated = moment({}).valueOf()
            const index = state.rootFile.records.findIndex((o) => o.assetHash === item.assetHash)
            if (index < 0) {
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
      })
    }
  }
}
export default myItemStore
