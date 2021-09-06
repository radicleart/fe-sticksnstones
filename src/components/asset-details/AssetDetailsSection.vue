<template>
<section :key="componentKey" id="asset-details-section" v-if="gaiaAsset && gaiaAsset.contractAsset" class="">
  <b-container class="center-section" style="min-height: 50vh;">
    <b-row align-h="center" :style="'min-height: ' + videoHeight + 'px'">
      <b-col lg="7" sm="10" class="mb-5">
        <div id="video-column" :style="dimensions">
          <MediaItem :videoOptions="videoOptions" :attributes="gaiaAsset.attributes" :targetItem="targetItem()"/>
        </div>
      </b-col>
      <b-col lg="5" sm="10">
        <b-row align-v="stretch" :style="'height: ' + videoHeight - 100 + 'px'">
          <b-col cols="12" class="">
            <div class="d-flex justify-content-between mb-5">
              <div><router-link class="" to="/nft-gallery"><b-icon icon="chevron-left" shift-h="-4" variant="white"></b-icon> Back</router-link></div>
              <div class="d-flex justify-content-between">
                <div class="text-center on-auction-text ml-3 py-3 px-4 bg-warning ">
                  <div v-if="isOwner"><router-link class="" to="/my-nfts">{{salesBadgeLabel}}</router-link></div>
                  <div v-else>{{salesBadgeLabel}}</div>
                  <div v-if="showEndTime()">{{biddingEndTime()}}</div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="12" align-self="end">
            <div class="w-100">
              <h1 class="">{{gaiaAsset.name}}</h1>
              <h2>{{gaiaAsset.artist}}</h2>
              <MintInfo :item="gaiaAsset" />
              <div class="w-100 " v-html="preserveWhiteSpace(gaiaAsset.description)">
              </div>
              <b-row v-if="getSaleType() === 0">
                <!--
                <b-col md="6" sm="12" v-if="editionsAvailable">
                  <EditionTrigger :item="gaiaAsset" @mintedEvent="mintedEvent"/>
                </b-col>
                <b-col md="6" sm="12">
                  <b-button @click="openUpdates()">GET UPDATES</b-button>
                </b-col>
                -->
              </b-row>
              <b-row v-else>
                <b-col v-if="webWalletNeeded" md="6" sm="12" class="mb-3">
                    <b-button class="w-100" style="height: 61px;" variant="outline-light"><a :href="webWalletLink" class="" target="_blank">Get Stacks Web Wallet <b-icon class="ml-3" icon="arrow-up-right-square-fill"/></a></b-button>
                </b-col>
                <b-col md="6" sm="6" class="mb-3 text-center" v-else-if="getSaleType() > 0 && getSaleType() < 3">
                  <b-button @click="openPurchaceDialog()">{{salesButtonLabel}}</b-button>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  <b-modal size="lg" id="asset-offer-modal" class="text-left">
    <PurchaseFlow v-if="showRpay === 1" :gaiaAsset="gaiaAsset" :forceOfferFlow="forceOfferFlow" @offerSent="offerSent"/>
    <AssetUpdatesModal v-if="showRpay === 2" @registerForUpdates="registerForUpdates"/>
    <template #modal-header="{ close }">
      <div class=" text-warning w-100 d-flex justify-content-end">
        <b-button size="sm" variant="white" @click="close()"  class="m-0 p-1 text-dark" style="max-width: 30px !important; max-height: 30px !important;">
          <b-icon icon="x"/>
        </b-button>
      </div>
    </template>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-between">
      </div>
    </template>
  </b-modal>
  <b-modal id="result-modal" class="">
    <b-row>
      <b-col cols="12" class="w-50">
        <h1>Confirmation</h1>
        <h4 class="text-center mb-5"><a :href="transactionUrl" target="_blank">Transaction sent to Stacks Blockchain</a></h4>
        <div class="mt-5"><a href="#" @click.prevent="back()"><b-icon icon="chevron-left"/> back</a></div>
      </b-col>
    </b-row>
    <template #modal-footer class="text-center">
      <div class="w-100">
      </div>
    </template>
  </b-modal>
  </b-container>
</section>
</template>

<script>
import Vue from 'vue'
import AssetUpdatesModal from './offers/AssetUpdatesModal'
import PurchaseFlow from './offers/PurchaseFlow'
import { APP_CONSTANTS } from '@/app-constants'
import MediaItem from '@/components/upload/MediaItem'
import moment from 'moment'
import utils from '@/services/utils'
import MintInfo from '@/components/toolkit/mint-setup/MintInfo'

export default {
  name: 'AssetDetailsSection',
  components: {
    AssetUpdatesModal,
    PurchaseFlow,
    MediaItem,
    MintInfo
  },
  props: ['gaiaAsset'],
  data: function () {
    return {
      forceOfferFlow: false,
      cross: require('@/assets/img/navbar-footer/cross.svg'),
      showRpay: 0,
      videoHeight: 0,
      componentKey: 0,
      showHash: false,
      assetHash: null,
      mintResult: null,
      mintResultTxId: null,
      message: 'No item available...'
    }
  },
  watch: {
    '$route' () {
      this.assetHash = this.$route.params.assetHash
      this.componentKey++
    }
  },
  mounted () {
    this.assetHash = this.$route.params.assetHash
    const $self = this
    this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'purchase-flow', asset: this.gaiaAsset })
    this.resizeContainers()
    if (window.eventBus && window.eventBus.$on) {
      window.eventBus.$on('rpayEvent', function (data) {
        if (data.opcode.indexOf('stx-transaction-sent') > -1 || data.opcode.indexOf('stx-transaction-update') > -1) {
          $self.$bvModal.hide('asset-offer-modal')
          $self.$bvModal.hide('result-modal')
          if (data.txStatus === 'success') {
            $self.$notify({ type: 'success', title: 'Buy Now', text: 'Congratulations! This NFT is now yours - redirecting to your NFT Library. ' })
            // this.$router.push('/my-nfts')
          } else if (data.txStatus === 'pending') {
            $self.$notify({ type: 'warning', title: 'Buy Now', text: 'Buy Now In Progress. ' })
          } else {
            $self.$notify({ type: 'warning', title: 'Buy Now', text: 'Buy Now In sent to blockchain. ' })
          }
        }
      })
    }
    Vue.nextTick(function () {
      const vid = document.getElementById('video-column')
      if (vid) this.videoHeight = vid.clientHeight
    }, this)
  },
  methods: {
    mintedEvent (data) {
      this.$store.commit('setModalMessage', 'Request to mint an edition sent to the blockchain.<br/> Transaction Id: ' + data.txId)
      this.$root.$emit('bv::show::modal', 'success-modal')
    },
    resizeContainers () {
      let resizeTimer
      const $self = this
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          const vid = document.getElementById('video-column')
          if (vid) $self.videoHeight = vid.clientHeight
        }, 400)
      })
    },
    formatNumber: function (number) {
      return utils.formatNumber(number)
    },
    preserveWhiteSpace: function (content) {
      return '<span class="text-description" style="white-space: break-spaces;">' + content + '</span>'
    },
    back: function () {
      this.$bvModal.hide('result-modal')
    },
    offerSent: function () {
      // local notification
    },
    showEndTime: function () {
      return this.gaiaAsset.contractAsset.saleData.saleType === 2
    },
    biddingEndTime: function () {
      return moment(this.gaiaAsset.contractAsset.saleData.biddingEndTime).format('ddd, MMMM Do, h:mma') + ' BST'
    },
    targetItem: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](this.gaiaAsset)
    },
    dimensions () {
      const dims = { width: '100%', height: '100%' }
      return 'max-width: ' + dims.height + '; max-height: ' + dims.height + ';'
    },
    poster: function () {
      if (this.gaiaAsset.attributes.coverImage) {
        return this.gaiaAsset.attributes.coverImage.fileUrl
      }
    },
    getArtist: function () {
      if (this.gaiaAsset.artist) {
        return this.gaiaAsset.artist
      } else if (this.gaiaAsset.owner) {
        return this.gaiaAsset.owner.substring(0, this.gaiaAsset.owner.indexOf('.'))
      } else {
        return 'Unknown Artist'
      }
    },
    openUpdates: function () {
      this.showRpay = 2
      this.$bvModal.show('asset-offer-modal', { assetHash: this.assetHash })
    },
    getSaleType: function () {
      return this.gaiaAsset.contractAsset.saleData.saleType
    },
    openPurchaceDialog: function () {
      this.forceOfferFlow = false
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile.loggedIn && this.gaiaAsset.contractAsset.saleData.saleType !== 3) {
        this.$store.dispatch('rpayAuthStore/startLogin').then(() => {
          this.$emit('registerByConnect')
        }).catch((err) => {
          console.log(err)
          // https://chrome.google.com/webstore/detail/stacks-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj
          this.webWalletNeeded = true
        })
      } else {
        if (this.gaiaAsset.contractAsset.saleData.saleType === 0) {
          return
        }
        this.showRpay = 1
        this.$bvModal.show('asset-offer-modal')
      }
    },
    openOfferPurchaceDialog: function () {
      this.forceOfferFlow = true
      this.showRpay = 1
      this.$bvModal.show('asset-offer-modal')
    },
    emailText () {
      const emailText = this.$store.getters[APP_CONSTANTS.KEY_EMAIL_TEXT]('registeremail')
      const answer = (emailText) ? emailText[0].text : 'Interest Registered'
      return answer
    },
    registerForUpdates: function (email) {
      const data = {
        emailContent: this.emailText(),
        status: 1,
        domain: location.host,
        assetHash: this.assetHash,
        email: email
      }
      this.$store.dispatch('rpayPurchaseStore/registerForUpdates', data).then((result) => {
        this.$store.commit('setModalMessage', 'Thanks for registering an interest - we will keep you updated.')
        this.showRpay = 0
        this.$bvModal.hide('asset-offer-modal')
        this.$root.$emit('bv::show::modal', 'success-modal')
        this.message = result
      }).catch(() => {
        this.$store.commit('setModalMessage', 'Thanks for re-registering an interest - we will keep you updated.')
        this.showRpay = 0
        this.$bvModal.hide('asset-offer-modal')
        this.$root.$emit('bv::show::modal', 'success-modal')
      })
    }
  },
  computed: {
    transactionUrl: function () {
      if (!this.gaiaAsset.mintInfo || !this.gaiaAsset.mintInfo.txId) return '#'
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + this.gaiaAsset.mintInfo.txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    editionsAvailable: function () {
      return this.gaiaAsset.contractAsset.editionCounter < this.gaiaAsset.contractAsset.tokenInfo.maxEditions
    },
    webWalletLink () {
      if (this.$browserDetect.isFirefox) {
        return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_FIREFOX]
      }
      return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_CHROME]
    },
    usdAmount () {
      try {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rate = tickerRates.find((o) => o.currency === 'USD')
        const offer = this.$store.getters[APP_CONSTANTS.KEY_HIGHEST_OFFER_ON_ASSET](this.gaiaAsset.contractAsset.tokenInfo.assetHash)
        const currentOffer = (offer && offer.amount) ? offer.amount : 0
        const minimumOffer = Math.max(currentOffer, (this.gaiaAsset.contractAsset.saleData.reservePrice))
        const amountUsd = Number(utils.toDecimals(rate.stxPrice * minimumOffer)).toLocaleString()
        return 'Current highest offer: ' + amountUsd + ' USD'
      } catch (e) {
        return null
      }
    },
    currentCost: function () {
      return this.gaiaAsset.contractAsset.tokenInfo.editionCost
    },
    salesButtonLabel () {
      if (this.webWalletNeeded) return 'GET WALLET'
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile.loggedIn) return 'LOGIN'
      let label = 'BUY NOW ' + this.gaiaAsset.contractAsset.saleData.buyNowOrStartingPrice + ' STX'
      if (this.gaiaAsset.contractAsset.saleData.saleType !== 1) {
        label = 'NOT ON SALE'
      }
      return label
    },
    salesBadgeLabel () {
      return this.salesButtonLabel
    },
    configuration () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_RPAY_CONFIGURATION]
      return configuration
    },
    videoOptions () {
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: true,
        assetHash: this.assetHash,
        autoplay: false,
        muted: false,
        controls: true,
        showMeta: false,
        dimensions: 'max-width: 100%; max-height: auto;',
        aspectRatio: '1:1',
        poster: (this.gaiaAsset.attributes.coverImage) ? this.gaiaAsset.attributes.coverImage.fileUrl : null,
        sources: [
          { src: this.gaiaAsset.attributes.artworkFile.fileUrl, type: this.gaiaAsset.attributes.artworkFile.type }
        ],
        fluid: false
      }
      return videoOptions
    },
    isOwner: function () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!this.gaiaAsset.contractAsset || !profile || !profile.loggedIn) return false
      return profile.stxAddress === this.gaiaAsset.contractAsset.owner
    },
    owner () {
      return this.gaiaAsset.contractAsset.owner
    },
    webWalletNeeded () {
      const webWalletNeeded = this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_NEEDED]
      return webWalletNeeded
    }
  }
}
</script>

<style>
.more-link {
  border: 1pt solid #fff;
  padding: 3px 10px;
  text-align: center;
  font-size: 1.2rem;
}
.on-auction-text {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.5rem;
}
#asset-offer-modal .modal-content {
  text-align: left !important;
}
</style>
