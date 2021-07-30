<template>
<div class="d-flex justify-content-center">
<b-navbar variant="light" id="navbar" :style="bannerImage">
  <b-navbar-brand><router-link class="navbar-brand" to="/"><img width="150px;" :src="logo" alt="risidio-logo"/></router-link></b-navbar-brand>
  <b-navbar-toggle target="my-sidebar">
    <!--
    <template #default="{ expanded }">
      <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
      <b-icon v-else icon="chevron-bar-down"></b-icon>
    </template>
    -->
    <b-button v-b-toggle:my-collapse>
      <span class="when-open"><b-icon icon="chevron-bar-up"></b-icon></span><span class="when-closed"><b-icon icon="chevron-bar-down"></b-icon></span>
    </b-button>
  </b-navbar-toggle>
  <!-- Mobile Design for login menu -->

  <b-sidebar id="my-sidebar"  sidebar-class="border-left border-secondary" bg-variant="white" text-variant="dark" aria-label="Sidebar" right>
    <template #default="{ hide }">
      <div class="pb-5 mt-5 border-bottom text-center">
        <h1>Welcome</h1>
        <h2>{{username}}</h2>
      </div>
      <div class="p-3 mb-5 border-bottom text-left">
        <h4><b-icon class="mr-3" icon="arrow-up-right"/> Navigation</h4>
        <div class="d-flex justify-content-center">
          <nav class="mt-4 mx-auto">
            <b-nav vertical class="text-small">
              <b-nav-item v-if="profile" active><b-link to="/my-items/all"><b-icon class="mr-2 mb-2" icon="files"></b-icon> My NFTs</b-link></b-nav-item>
              <b-nav-item v-if="profile.superAdmin" active><b-link to="/app-admin"><b-icon class="mr-2 mb-2" icon="person"></b-icon> App Admin</b-link></b-nav-item>
              <b-nav-item @click="hide"><b-link @click.prevent="logout()"><b-icon icon="person" class="mr-2 mb-2"/> Logout</b-link></b-nav-item>
            </b-nav>
          </nav>
        </div>
        <div class="mt-4 d-flex justify-content-center">
          <b-button variant="warning" class="mr-2 mb-2"><b-link class="text-white" to="/create">Upload New Item</b-link></b-button>
        </div>
      </div>
      <div class="p-3 mb-5 border-bottom text-left">
        <h4 id="sidebar-no-header-title"><b-icon class="mr-3" icon="wallet2"/> Wallet</h4>
        <p class="text-center">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item><span>Address</span></b-nav-item>
              <b-nav-item><span class="stx-address">{{profile.stxAddress}}</span></b-nav-item>
              <b-nav-item v-if="profile.accountInfo" active><span>Balance: <span class="text-secondary">{{profile.accountInfo.balance}}</span> STX</span></b-nav-item>
            </b-nav>
          </nav>
        </p>
      </div>
    </template>
  </b-sidebar>

    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="profile.loggedIn" class="mr-3 mt-0"><router-link class="text-white" to="/create">Upload Item</router-link></b-nav-item>
      <b-nav-item v-if="profile.loggedIn" class="mr-3"><a v-b-toggle.my-sidebar class="text-white nav-text" ><b-icon icon="person" class="mb-3 mr-0"/> Account</a></b-nav-item>
      <b-nav-item v-else class="text-white" @click.prevent="startLogin()" href="#">Login</b-nav-item>
    </b-navbar-nav>
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
.navbar-toggler svg {
  font-size: 3.4rem;
  font-weight: 700;
  color: #fff;
  z-index: 5000;
  opacity: 1.0;
}
/* NAV ITEMS STYLE */
.nav-text a {
  font-weight: 700;
}
.navbar-light .navbar-nav .nav-link {
    color: #fff !important;
}
.b-sidebar > .b-sidebar-header {
    padding: 50px 10px;
}
</style>
