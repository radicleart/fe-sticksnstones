<template>
<div class="page-nav">
<b-navbar toggleable="lg" type="dark" variant="info">
  <b-navbar-brand><router-link class="navbar-brand" to="/"><img style="max-height: 60px;max-width: 60px;" :src="logo" alt="risidio-logo"/></router-link></b-navbar-brand>
  <b-navbar-toggle target="nav-collapse">
    <span> </span>
    <span> </span>
    <span> </span>
  </b-navbar-toggle>
  <!-- Mobile Design for login menu -->
  <b-navbar-nav class="ml-auto d-xl-none">
    <b-nav-item v-if="loggedIn">
      <div v-if="avatar" v-b-toggle.login-sidebar class=""><span v-html="avatar"></span><span class="text-info">Account</span></div>
      <div v-else v-b-toggle.login-sidebar class=""><span><b-icon icon="person" class=""/></span><span class="text-info">Account</span></div>
    </b-nav-item>
    <b-nav-item @click.prevent="startLogin()" href="#" v-else><button class="login-button button-secondary text-white">Login</button></b-nav-item>
  </b-navbar-nav>

  <b-collapse id="nav-collapse" is-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto ">
      <b-nav-item><router-link class="text-white" to="/upload-item">Upload Item</router-link></b-nav-item>
      <b-nav-item><router-link class="text-white" to="/upload">Upload</router-link></b-nav-item>
      <b-nav-item><router-link class="text-white" to="/my-items">My Items</router-link></b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="">
      <b-nav-item class="" v-if="loggedIn">
        <div v-if="avatar" v-b-toggle.login-sidebar class=" d-flex align-items-center"><span v-html="avatar"></span><span class=" ">Account</span></div>
        <div v-else v-b-toggle.login-sidebar class=" d-flex align-items-center"><span><b-icon icon="person" class=""/></span><span @click="logout" class="">Account</span></div>
      </b-nav-item>
      <b-nav-item @click.prevent="startLogin()" href="#" v-else><button class="login-button button-secondary text-white">Login</button></b-nav-item>
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
      logo: require('@/assets/img/sticksnstones_logo.png')
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('authStore/startLogout').then(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
    },
    startLogin () {
      this.$store.dispatch('authStore/startLogin')
    }
  },
  computed: {
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
    loggedIn () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.loggedIn
    }
  }
}
</script>

<style lang="scss">
/* NAVBAR PADDING AND WIDTH */
body {
  padding: 0;
  margin: 0;
}
.page-nav {
    margin-right: 0;
    margin-left: 0;
    border-width: .2rem;
    height: 120px;
}
</style>
