<template>
<b-container fluid v-if="loading" :style="'min-height: 100vh; background-image: url(' + background + ')'">
  <b-row class="splash-screen vh-100 text-center" align-v="center">
    <b-col><b-button class="main-navigation-button" variant="transparent"><img :src="threedotsr"/></b-button></b-col>
  </b-row>
</b-container>
<div id="app" v-else :style="'min-height: 100vh; background-image: url(' + background + ')'">
  <div v-if="!configured">
    <risidio-pay :configuration="configuration"/>
  </div>
  <div :key="componentKey" v-else>
    <router-view name="header" class="" style="height: 128px;"/>
    <router-view class="" style="min-height: 72vh;"/>
    <router-view name="footer"/>
    <notifications :duration="10000" classes="r-notifs" position="bottom right" width="30%"/>
    <waiting-modal/>
    <success-modal />
  </div>
</div>
</template>

<script>
import SuccessModal from '@/components/utils/SuccessModal'
import WaitingModal from '@/components/utils/WaitingModal'
import RisidioPay from 'risidio-pay'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'App',
  components: {
    SuccessModal,
    WaitingModal,
    RisidioPay
  },
  data () {
    return {
      threedotsr: require('@/assets/img/threedotsr.png'),
      background: 'https://dbid.cdn.prismic.io/dbid/4b87f7dd-e614-4f4f-815b-3a4995fcffba_main-navbar-bg.svg',
      loading: true,
      configured: false,
      componentKey: 0
    }
  },
  mounted () {
    this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'config-flow', asset: this.gaiaAsset })
    const $self = this
    setTimeout(function () {
      $self.loading = false
    }, 1000)
    if (window.eventBus && window.eventBus.$on) {
      window.eventBus.$on('rpayEvent', function (data) {
        if (data.opcode === 'configured') {
          $self.$store.dispatch('initApplication').then(() => {
            // $self.$store.dispatch('rpaySearchStore/fetchContractData')
            $self.configured = true
          })
        } else if (data.opcode === 'stx-transaction-mint') {
          // commit it straight away to avoid double clicks on the minting button
        } else if (data.opcode === 'stx-transaction-mint-error') {
        } else if (data.opcode === 'configured-logged-in') {
          $self.$store.commit('rpayAuthStore/setAuthResponse', data.session)
          $self.$store.dispatch('rpayAuthStore/fetchMyAccount')
        }
      })
    }
    let resizeTimer
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        $self.$store.commit('setWinDims')
        $self.componentKey += 1
      }, 400)
    })
    this.$prismic.client.getSingle('homepage').then(document => {
      if (document) {
        this.$store.commit('contentStore/addHomeContent', document.data)
      }
    })
    this.$prismic.client.getSingle('how-it-works').then(document => {
      if (document) {
        this.$store.commit('contentStore/addHowItWorks', document.data)
      }
    })
  },
  methods: {
    scrollMeTo (data) {
      const element = document.getElementById(data.refName)
      const top = element.offsetTop
      window.scrollTo(0, top)
    }
  },
  computed: {
    configuration () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_RPAY_CONFIGURATION]
      return configuration
    }
  }
}
</script>
