<template>
<div class="page-nav">
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <div class="d-block d-md-none">
        <router-link to="/" class="navbar-brand"><img height="30px" :src="logo" alt="risidio-logo"/></router-link>
      </div>
      <div class="d-none d-md-block">
        <router-link to="/" class="navbar-brand"><img height="50px" :src="logo" alt="risidio-logo"/></router-link>
      </div>
    </b-navbar-brand>
    <b-navbar-toggle class="" target="nav-collapse">
      <template v-slot:default="{ expanded }">
        <b-icon width="20px" height="30px" v-if="expanded" icon="chevron-contract"></b-icon>
        <img width="20px" v-else :src="toggler"/>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar class="ml-auto">
        <b-navbar-nav class="ml-auto ">
          <b-nav-item><router-link class="text-white" to="/upload-item">Upload Item</router-link></b-nav-item>
          <b-nav-item><router-link class="text-white" to="/my-items">My Items</router-link></b-nav-item>
          <b-nav-item-dropdown class="nav-text" right v-if="loggedIn" caret>
            <template v-slot:button-content>
              Account
            </template>
            <b-dropdown-item>{{username()}}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <span @click="logout()">Logout</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item class="nav-text" v-else><span @click.prevent="startLogin()">Login</span></b-nav-item>
        </b-navbar-nav>
      </b-navbar>
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
      toggler: require('@/assets/img/navbar/Icon_ionic-md-options.svg'),
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
    username () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.username
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
