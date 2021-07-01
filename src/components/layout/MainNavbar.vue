<template>
<div class="d-flex justify-content-center">
<b-navbar variant="transparent" id="navbar" :style="bannerImage" toggleable="xl">
  <b-navbar-brand><router-link class="navbar-brand" to="/"><img width="150px;" :src="logo" alt="risidio-logo"/></router-link></b-navbar-brand>
  <b-navbar-toggle target="nav-collapse" @click="mobileMenuExpandClass(); noScroll();">
    <span> </span>
    <span> </span>
    <span> </span>
  </b-navbar-toggle>
  <!-- Mobile Design for login menu -->
  <b-collapse id="nav-collapse" is-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-xl-auto align-items-xl-center">
      <!-- <b-nav-item><router-link class="text-white" to="/community?uid=lambda-v-stacks">How It Works</router-link></b-nav-item> -->
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item-dropdown class="text-white nav-text" right v-if="profile.loggedIn" no-caret>
        <template v-slot:button-content>
          <span class="text-white nav-text" style="font-size: 2.6rem;"><b-icon icon="person" class="mb-3 mr-0"/></span>
        </template>
        <b-dropdown-item>{{username}}</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item>
          <span>{{profile.stxAddress}}</span>
        </b-dropdown-item>
        <b-dropdown-item v-if="profile.accountInfo">
          <span>Balance: {{profile.accountInfo.balance}} STX</span>
        </b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item>
          <span @click="logout()">Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item class="text-white" @click.prevent="startLogin()" href="#" v-else>Login</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'MainNavbar',
  components: {
  },
  data () {
    return {
      query: null,
      banner: 'https://images.prismic.io/digirad/6e5bb3a5-21b7-4bcb-b5a7-85128b6e6e8a_Rumba_bg_small.png?auto=compress,format',
      logo: 'https://images.prismic.io/digirad/136adb87-c542-4439-8bcc-7199007290cc_Groupe+16068%402x.png?auto=compress,format',
      logo1: require('@/assets/img/ruma/ruma-logo.svg')
    }
  },
  methods: {
    logout () {
      // this.$emit('updateEventCode', { eventCode: 'connect-logout' })
      this.$store.dispatch('rpayAuthStore/startLogout').then(() => {
        if (this.$route.name !== 'home') {
          this.$router.push('/')
        }
        // sessionStorage.clear()
      }).catch((err) => {
        console.log(err)
        this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
      })
    },
    startLogin () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        this.$emit('connect-login', myProfile)
      } else {
        this.$store.dispatch('rpayAuthStore/startLogin').catch(() => {
          // https://www.hiro.so/wallet/install-web
          this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
        })
      }
    },
    mobileMenuExpandClass () {
      const element = document.getElementById('navbar')
      element.classList.toggle('navbar__mobile-design')
    },
    noScroll () {
      const element = document.getElementById('app')
      element.classList.toggle('no-scroll')
      document.body.classList.toggle('no-scroll')
    }
  },
  computed: {
    projects () {
      const appmap = this.$store.getters[APP_CONSTANTS.KEY_REGISTRY]
      if (appmap) return appmap.apps
      return []
    },
    content () {
      const content = this.$store.getters['contentStore/getHomepage']
      return content
    },
    bannerImage () {
      if (this.$route.name === 'homepage') {
        return ''
      }
      const content = this.$store.getters['contentStore/getHomepage']
      if (!content) {
        return
      }
      return {
        height: '128px',
        width: '100%',
        'background-repeat': 'no-repeat',
        'background-image': `url(${this.banner})`,
        'background-position': 'center center',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
      }
    },
    showAdmin () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.showAdmin || location.origin.indexOf('local') > -1
    },
    balance () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return (profile && profile.wallet) ? profile.wallet.balance : 0
    },
    stxAddress () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (profile.wallet && profile.wallet.keyInfo.address) {
        return profile.wallet.keyInfo.address.substring(0, 5) + '...' + profile.wallet.keyInfo.address.substring(profile.wallet.keyInfo.address.length - 5)
      }
      return 'n/a'
    },
    username () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile) {
        return 'unknown'
      } else if (profile.name && profile.name.length > 0) {
        return profile.name
      } else if (profile.username && profile.username.length > 0) {
        return profile.username
      } else {
        return profile.identityAddress
      }
    },
    avatar () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (profile.loggedIn) {
        if (profile.avatarUrl) {
          return (
            '<img style="width: 30px; height: 30px; border-radius: 20px;" src="' +
            profile.avatarUrl +
            '"/>'
          )
        }
      }
      return null
    },
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    },
    webWalletNeeded () {
      const webWalletNeeded = this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_NEEDED]
      return webWalletNeeded
    }
  }
}
</script>

<style lang="scss">
/* NAVBAR PADDING AND WIDTH */
nav.navbar {
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  position: absolute!important;
  top: 0;
  left: 0;
}

/* NAV ITEMS STYLE */
.nav-text a {
  font-weight: 700;
}
.navbar-light .navbar-nav .nav-link {
    color: #fff !important;
}
</style>
