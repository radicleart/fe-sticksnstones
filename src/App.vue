<template>
<div id="app">
  <div v-if="!configured">
    <risidio-pay :configuration="configuration"/>
  </div>
  <div :key="componentKey" v-else>
    <router-view name="header" style="height: 128px; z-index: 10;"/>
    <router-view class="my-5" style="min-height: 100vh;" />
    <router-view name="footer"/>
    <notifications :duration="10000" classes="r-notifs" position="bottom left" width="60%"/>
    <waiting-modal/>
    <success-modal />
  </div>
</div>
</template>

<script>
import SuccessModal from '@/components/utils/SuccessModal'
import WaitingModal from '@/components/utils/WaitingModal'
// import RisidioPay from 'risidio-pay'
import { APP_CONSTANTS } from '@/app-constants'

const RisidioPay = () => import('risidio-pay')

export default {
  name: 'App',
  components: {
    SuccessModal,
    WaitingModal,
    RisidioPay
  },
  data () {
    return {
      loading: true,
      configured: false,
      componentKey: 0
    }
  },
  mounted () {
    this.setupEventListener()
    // this.resizeContainers()
    this.readPrismicContent()
  },
  methods: {
    setupEventListener () {
      this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'config-flow', asset: this.gaiaAsset })
      const $self = this
      this.loading = false
      if (window.eventBus && window.eventBus.$on) {
        window.eventBus.$on('rpayEvent', function (data) {
          if (data.opcode === 'configured') {
            $self.$store.dispatch('initApplication').then(() => {
              $self.configured = true
            })
          }
        })
      }
    },
    readPrismicContent () {
      this.$prismic.client.getSingle('tooltips').then(document => {
        if (document) {
          this.$store.commit('contentStore/addTooltips', document.data)
        }
      })
      this.$prismic.client.getSingle('dialogs').then(document => {
        if (document) {
          this.$store.commit('contentStore/addDialogs', document.data)
        }
      })
      this.$prismic.client.getSingle('terms').then(document => {
        if (document) {
          this.$store.commit('contentStore/addTerms', document.data)
        }
      })
      this.$prismic.client.getSingle('developers').then(document => {
        if (document) {
          this.$store.commit('contentStore/addDevelopers', document.data)
        }
      })
      this.$prismic.client.getSingle('privacy').then(document => {
        if (document) {
          this.$store.commit('contentStore/addPrivacy', document.data)
        }
      })
      this.$prismic.client.getSingle('faq').then(document => {
        if (document) {
          this.$store.commit('contentStore/addFAQ', document.data)
        }
      })
      this.$prismic.client.getSingle('homepage').then(document => {
        if (document) {
          this.$store.commit('contentStore/addHomeContent', document.data)
        }
      })
      this.$prismic.client.getSingle('about').then(document => {
        if (document) {
          this.$store.commit('contentStore/addAbout', document.data)
        }
      })
      this.$prismic.client.getSingle('howitworks').then(document => {
        if (document) {
          this.$store.commit('contentStore/addHowItWorks', document.data)
        }
      })
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'information_page'),
        { pageSize: 40, page: 1 }
      ).then((response) => {
        this.$store.commit('contentStore/addInformation', response.results)
      })
    },
    resizeContainers () {
      let resizeTimer
      const $self = this
      window.addEventListener('resize', function () {
        const resizable = $self.$route.meta.resizable
        if (!resizable) {
          return
        }
        $self.loading = true
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          $self.$store.commit('setWinDims')
          $self.componentKey += 1
          $self.loading = false
        }, 400)
      })
    },
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
<style lang="scss" scoped>
</style>
