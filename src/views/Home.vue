<template>
<section class="" id="section-upload">
  <b-container class="mt-5 pt-5">
    <b-row style="min-height: 30vh" class="text-center" v-if="loggedIn">
      <b-col cols="12"><b-link to="/create">Start Minting NFTs</b-link></b-col>
    </b-row>
    <b-row style="min-height: 30vh" class="text-center" v-else-if="webWalletNeeded">
      <b-col cols="12">You need to download the web wallet to login and start minting your very own NFTs!</b-col>
      <b-col cols="12"><a class="pointer mx-4" :href="webWalletLink" target="_blank">Stacks Web Wallet <b-icon class="ml-3" icon="arrow-up-right-square-fill"/></a></b-col>
    </b-row>
    <b-row  class="text-center" v-else>
      Please login to get started!
    </b-row>
  </b-container>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      nftState: 0
    }
  },
  mounted () {
    const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
    if (profile.loggedIn) {
      // this.$router.push('/create')
      this.nftState = 3
    } else {
      this.nftState = 1
    }
  },
  methods: {
  },
  computed: {
    webWalletLink () {
      if (this.$browserDetect.isFirefox) {
        return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_FIREFOX]
      }
      return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_CHROME]
    },
    webWalletNeeded () {
      const webWalletNeeded = this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_NEEDED]
      return webWalletNeeded
    },
    loggedIn () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.loggedIn
    }
  }
}
</script>
<style lang="scss" >
#upload-item .drop-zone {
  min-width: 300px;
  min-height: 300px;
  padding: 20px;
  height: auto;
  border-radius: 18px;
  border: 1pt dashed rgb(146, 146, 38);
  text-align: center;
}
#upload-item .badge {
  cursor: pointer;
  padding: 5px !important;
}
</style>
