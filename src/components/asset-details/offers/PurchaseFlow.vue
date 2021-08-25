<template>
<div v-if="!loading">
  <div v-if="flowType === 1">
    <PurchaseOfferLogin :offerData="offerData" @registerByEmail="registerByEmail" @registerByConnect="registerByConnect" @backStep="backStep"/>
  </div>
  <div v-else>
    <div>
      <div v-if="contractAsset && contractAsset.saleData.saleType === 1">
        <PurchaseBuyNow :contractAsset="contractAsset" :saleData="contractAsset.saleData" @buyNow="buyNow"/>
        <div class="text-danger" v-html="errorMessage"></div>
      </div>
      <div v-else>
        Asset not on sale.
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import PurchaseBuyNow from './PurchaseBuyNow'
import PurchaseOfferLogin from './PurchaseOfferLogin'
import {
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from '@stacks/transactions'
import utils from '@/services/utils'
import BigNum from 'bn.js'

const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME
const NETWORK = process.env.VUE_APP_NETWORK

export default {
  name: 'PurchaseFlow',
  components: {
    PurchaseOfferLogin,
    PurchaseBuyNow
  },
  props: ['gaiaAsset', 'forceOfferFlow'],
  data () {
    return {
      errorMessage: null,
      loading: true,
      offerStage: 0,
      offerData: {},
      biddingData: {},
      biddingEndTime: null,
      flowType: 0,
      contentKey: null,
      webWalletNeeded: false
    }
  },
  mounted () {
    this.errorMessage = null
    this.$store.commit('rpayCategoryStore/setModalMessage', '')
    this.$store.dispatch('rpayStacksStore/fetchMacSkyWalletInfo').then(() => {
      this.$store.commit('rpayStore/setDisplayCard', 100)
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
    const $self = this
    window.eventBus.$on('rpayEvent', function (data) {
      if (data.opcode.indexOf('-mint-success') > -1) {
        $self.$store.commit('rpayStore/setDisplayCard', 106)
      }
    })
  },
  methods: {
    buyNow: function () {
      const contractAsset = this.gaiaAsset.contractAsset
      // const mac = this.$store.getters[APP_CONSTANTS.KEY_MACS_WALLET]
      // const sky = this.$store.getters[APP_CONSTANTS.KEY_SKYS_WALLET]
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      const recipient = profile.stxAddress // (contractAsset.owner === mac.keyInfo.address) ? sky.keyInfo.address : mac.keyInfo.address
      if (!profile.loggedIn) {
        this.$store.dispatch('rpayAuthStore/startLogin').then(() => {
          this.$emit('registerByConnect')
        }).catch((err) => {
          console.log(err)
          // https://www.hiro.so/wallet/install-web
          this.webWalletNeeded = true
        })
      }
      const standardSTXPostCondition = makeStandardSTXPostCondition(
        profile.stxAddress,
        FungibleConditionCode.LessEqual,
        new BigNum(utils.toOnChainAmount(contractAsset.saleData.buyNowOrStartingPrice))
      )

      if (NETWORK === 'local') {
        // recipient = (contractAsset.owner === mac.keyInfo.address) ? sky.keyInfo.address : mac.keyInfo.address
      }
      const buyNowData = {
        postConditions: [standardSTXPostCondition],
        contractAddress: STX_CONTRACT_ADDRESS,
        contractName: STX_CONTRACT_NAME,
        sendAsSky: false,
        nftIndex: contractAsset.nftIndex,
        buyNowOrStartingPrice: contractAsset.saleData.buyNowOrStartingPrice,
        owner: contractAsset.owner,
        provider: 'risidio',
        recipient: recipient
      }
      this.$store.dispatch('rpayPurchaseStore/buyNow', buyNowData).then((result) => {
        this.contentKey = 'successful-buy'
        this.flowType = 2
        this.$emit('buySent', result)
      }).catch((err) => {
        this.errorMessage = err
        this.flowType = 3
      })
    },
    minted () {
      const contractAsset = this.gaiaAsset.contractAsset
      if (!contractAsset) return
      return contractAsset.nftIndex > -1
    }
  },
  computed: {
    contractAsset () {
      return this.gaiaAsset.contractAsset
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
