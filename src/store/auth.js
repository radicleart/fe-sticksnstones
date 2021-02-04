import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { Person } from '@stacks/profile'

const appConfig = new AppConfig(['store_write', 'publish_data'])

export const userSession = new UserSession({ appConfig })

export function authenticate () {
  showConnect({
    appDetails: {
      name: 'Sticks n Stones',
      icon: '/img/sticksnstones_logo.8217b8f7.png'
    },
    redirectTo: '/',
    finished: () => {
      window.location.reload()
    },
    userSession: userSession
  })
}

export function getUserData () {
  return userSession.loadUserData()
}

export function getPerson () {
  return new Person(getUserData().profile)
}
