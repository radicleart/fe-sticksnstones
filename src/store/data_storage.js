import { Storage } from '@stacks/storage'
import { userSession, appConfig } from './auth.js'

const storage = new Storage({ userSession })

export const storeData = async (fileName, fileData, options) => {
  await storage.putFile(fileName, JSON.stringify(fileData), options).then(fileUrl => {
    console.log(fileUrl)
    return fileUrl
  })
}

export const getData = async (fileName, options) => {
  console.log('Fonction Lancée')
  await storage.getFile(fileName, options).then(fileData => {
    return fileData
  })
}
