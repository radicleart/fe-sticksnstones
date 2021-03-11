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
    },
    myItem: state => assetHash => {
      let item
      if (state.myItems && assetHash) {
        item = state.myItems.find(myItem => myItem.assetHash === assetHash)
      }
      return item
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
    deleteItem ({ state }, item) {
      return new Promise(() => {
        let musicUrl = item.musicFileUrl
        let imageUrl = item.imageUrl
        const indexMusic = musicUrl.lastIndexOf('/') + 1
        const indexImage = imageUrl.lastIndexOf('/') + 1
        musicUrl = musicUrl.substring(indexMusic)
        imageUrl = imageUrl.substring(indexImage)
        myItemService.deleteItem(musicUrl)
        myItemService.deleteItem(imageUrl)

        const extractHash = musicUrl.substr(0, musicUrl.indexOf('.'))
        const index = state.rootFile.records.findIndex((o) => o.assetHash === extractHash)
        state.rootFile.records.splice(index, 1)

        console.log(state.rootFile.records)
        myItemService.saveItem(state.rootFile)
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
    saveModifications ({ state, commit }, item) {
      return new Promise((resolve, reject) => {
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
      })
    },
    saveMusicFile ({ state, commit, dispatch }, item) {
      return new Promise((resolve, reject) => {
        const rootFile = state.rootFile
        const assetHash = utils.buildHash(item.musicFile.dataUrl)
        const index = rootFile.records.findIndex((o) => o.assetHash === assetHash)
        if (index > -1) {
          // this music file has already been uploaded - no need to upload it again
          commit('rootFile', rootFile)
          resolve(rootFile.records[index])
          return
        }
        const musicFileName = assetHash + utils.getFileExtension(item.musicFile.name)
        myItemService.uploadFileData(musicFileName, item.musicFile).then((gaiaUrl: string) => {
          item.assetHash = assetHash
          item.musicFile.dataUrl = null
          item.musicFileUrl = gaiaUrl
          dispatch('saveItem', item).then((item) => {
            resolve(item)
          })
        }).catch((error) => {
          reject(error)
        })
      })
    },
    saveCoverFile ({ dispatch }: any, item: any) {
      return new Promise((resolve, reject) => {
        if (!item.assetHash || !item.musicFileUrl || !item.coverImage) {
          reject(new Error('Unable to save your data...'))
          return
        }
        const coverImageFileName = item.assetHash + utils.getFileExtension(item.coverImage.name)
        myItemService.uploadFileData(coverImageFileName, item.coverImage).then((gaiaUrl: string) => {
          item.imageUrl = gaiaUrl
          item.musicFile.dataUrl = null
          item.coverImage.dataUrl = null
          dispatch('saveItem', item).then((item) => {
            resolve(item)
          })
        }).catch(() => {
          item.musicFile.dataUrl = null
          item.coverImage.dataUrl = null
          dispatch('saveItem', item).then((item) => {
            resolve(item)
          })
        })
      })
    },
    saveItem ({ state, commit }: any, item: any) {
      return new Promise((resolve, reject) => {
        const profile = store.getters[APP_CONSTANTS.KEY_PROFILE]
        item.uploader = profile.username
        if (!profile.loggedIn || !item.assetHash || !item.musicFileUrl || !item.coverImage || !item.musicFile || !item.name) {
          reject(new Error('Unable to save your data...'))
          return
        }
        if (!item.nftIndex) item.nftIndex = -1
        item.musicFile.dataUrl = null
        item.coverImage.dataUrl = null
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
      })
    }
  }
}
export default myItemStore
