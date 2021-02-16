/**
 * myItemService stores and retrieves user data from backend storage
 * this implementation uses gaia but this could in theory be swapped with
 * centralised db without affecting the application.
 * Schema for the data stored by this service is in the PRD on confluence...
 * https://mijoco.atlassian.net/wiki/spaces/RP/pages/2182709258/PRD+Sticksnstones
 */
import { UserSession } from '@stacks/connect'
import { Storage } from '@stacks/storage'
import moment from 'moment'

const ITEM_ROOT_PATH = process.env.VUE_APP_ITEM_ROOT_PATH
const userSession = new UserSession()
const storage = new Storage({ userSession })
const getNewRootFile = function () {
  const now = moment({}).valueOf()
  const newRootFile = {
    created: now,
    artistProfile: {},
    records: []
  }
  return newRootFile
}
const getFile = function (path) {
  return new Promise((resolve) => {
    storage.getFile(path).then((gaiaFile) => {
      resolve(gaiaFile)
    }).catch(() => {
      resolve()
    })
  })
}

const myItemService = {
  initItemSchema: function (profile) {
    return new Promise((resolve) => {
      if (!profile.loggedIn) {
        resolve(getNewRootFile())
        return
      }
      const rootFile = getNewRootFile()
      storage.getFile(ITEM_ROOT_PATH, { decrypt: false }).then((file: string) => {
        if (!file) {
          storage.putFile(ITEM_ROOT_PATH, JSON.stringify(rootFile), { encrypt: false })
          resolve(rootFile)
        } else {
          resolve(JSON.parse(file))
        }
      }).catch(() => {
        storage.putFile(ITEM_ROOT_PATH, JSON.stringify(rootFile), { encrypt: false })
        resolve(rootFile)
      })
    })
  },
  fetchUserItems: function (username) {
    return new Promise((resolve, reject) => {
      storage.getFile(ITEM_ROOT_PATH, { username: username, decrypt: false }).then((file: string) => {
        if (!file) {
          resolve()
        } else {
          const rootFile = JSON.parse(file)
          resolve(rootFile.projects)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  fetchMyItems: function (profile) {
    return new Promise((resolve, reject) => {
      if (!profile.loggedIn) {
        resolve(getNewRootFile())
        return
      }
      storage.getFile(ITEM_ROOT_PATH, { decrypt: false }).then((file: string) => {
        if (!file) {
          const rootFile = getNewRootFile()
          storage.putFile(ITEM_ROOT_PATH, JSON.stringify(rootFile), { encrypt: false })
          resolve(rootFile)
        } else {
          const rootFile = JSON.parse(file)
          resolve(rootFile)
        }
      }).catch(() => {
        reject(new Error('Failed to fetch - logged in?'))
      })
    })
  },
  uploadMusicData: function (filename, musicFile) {
    return new Promise((resolve) => {
      // const artwork = Buffer.from(imageData.imageBuffer).toString('base64') // imageDataURI.decode(dataUrl)
      const path = filename
      const options = {
        contentType: musicFile.mimeType,
        encrypt: false
      }
      getFile(path).then((file) => {
        if (file) console.log('overwriting file: ' + file)
        storage.putFile(path, musicFile.imageBuffer, options).then(function () {
          storage.getFileUrl(path).then((gaiaUrl) => {
            resolve(gaiaUrl)
          }).catch(() => {
            resolve()
          })
        }).catch((error) => {
          console.log(error)
          resolve()
        })
      })
    })
  },
  saveItem: function (rootFile) {
    return new Promise((resolve, reject) => {
      rootFile.updated = moment({}).valueOf()
      storage.putFile(ITEM_ROOT_PATH, JSON.stringify(rootFile), { encrypt: false }).then(() => {
        resolve(rootFile)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default myItemService
