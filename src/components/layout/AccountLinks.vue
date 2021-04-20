<template>
<div>
  <div class="login-sidebar__item-group login-sidebar--border-bottom">
    <div class="text2"><router-link to="/account"><b-icon class="mr-2" icon="person"></b-icon> Account</router-link></div>
    <div class="text-xlight mb-0 d-flex justify-content-between">
      <div class="">Balance</div>
      <div><span>STX</span> <span class="text-info">{{ balance }}</span></div>
    </div>
    <div class="text-xlight d-flex justify-content-between">
      <div>{{ stxAddress }}</div>
      <div><a href="#" @click.prevent="copyAddress" class=""><b-icon icon="files"></b-icon></a></div>
    </div>
  </div>
  <div class="login-sidebar__item-group login-sidebar--border-bottom">
    <div class="text2"><router-link to="/my-items"><b-icon class="mr-2" icon="collection" /> My NFTs</router-link></div>
    <!-- <div class="text2"><router-link to="#"><b-icon class="mr-2" icon="gift" /> My Offers</router-link></div> -->
  </div>
  <div class="login-sidebar__item-group login-sidebar--border-bottom">
    <div class="text2 mb-2">
      <router-link to="/admin-app"><b-icon class="mr-2" icon="gear" /> Developers</router-link>
    </div>
    <div class="text-xlight mb-2 ml-4">
      <router-link class="ml-2 pl-1" to="/admin-app">Connect Application</router-link>
    </div>
    <div class="text-xlight mb-2 ml-4">
      <span class="ml-2 pl-1" v-if="showSysLink"><router-link to="/my-app-settings">System Settings</router-link></span>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'AccountLinks',
  components: {
  },
  watch: {
  },
  data () {
    return {
    }
  },
  methods: {
    copyAddress () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      utils.copyAddress(document, this.$refs.lndQrcode, profile.wallet.keyInfo.address)
      this.$notify({ type: 'info', title: 'Copied', text: 'STX Address to clipboard.' })
    }
  },
  computed: {
    walletMode () {
      const walletMode = this.$store.getters[APP_CONSTANTS.KEY_WALLET_MODE]
      return walletMode
    },
    balance () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return (profile && profile.wallet) ? profile.wallet.balance : 0
    },
    balanceMac () {
      const wallet = this.$store.getters[APP_CONSTANTS.KEY_MACS_WALLET]
      return (wallet) ? wallet.balance : 0
    },
    balanceSky () {
      const wallet = this.$store.getters[APP_CONSTANTS.KEY_SKYS_WALLET]
      return (wallet) ? wallet.balance : 0
    },
    stxAddress () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.stxAddress.substring(0, 5) + '...' + profile.stxAddress.substring(profile.stxAddress.length - 5)
    },
    myProjects () {
      const projects = this.$store.getters[APP_CONSTANTS.KEY_MY_PROJECTS]
      return projects
    },
    showSysLink () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return (profile) ? profile.superAdmin : false
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
