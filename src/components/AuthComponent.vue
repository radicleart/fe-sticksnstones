<template>
    <div class="AuthComponent">
      <div v-if="!isConnected">
        <button @click="authenticate">Log in</button>
      </div>
      <div v-else>
        You are connected as {{ userData }}
        <button @click="signingOut">Log out</button>
      </div>
    </div>
</template>

<script>
import { authenticate, userSession } from '@/store/auth.js'

export default {
  name: 'AuthComponent',
  data () {
    return {
      isConnected: userSession.isUserSignedIn(),
      userData: userSession.loadUserData()
    }
  },
  methods: {
    componentDidMount () {
      if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
          window.history.replaceState({}, document.title, '/')
          this.setState({ userData: userData })
        })
      } else if (userSession.isUserSignedIn()) {
        this.setState({ userData: userSession.loadUserData() })
      }
    },
    authenticate () { authenticate() },
    signingOut () {
      userSession.signUserOut()
      window.location.reload()
    }
  }

}
</script>
