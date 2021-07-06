<template>
<div class="mx-5 d-flex justify-content-center" v-if="!loading">
  <div class="mx-auto">
    <b-card-group class="" :key="componentKey" style="width: 450px;">
      <b-card header-tag="header" footer-tag="footer" v-if="minted">
        <selling-header :allowEdit="true"/>
        <selling-options v-if="displayCard === 100" @updateSaleDataInfo="updateSaleDataInfo"/>
        <div class="text-center">
          <div class="text-info" v-html="sellingMessage"></div>
        </div>
        <template v-slot:footer>
          <div class="d-flex justify-content-between">
            <b-button @click="back()" class="w-50 mr-4" variant="outline-light">Cancel</b-button>
            <b-button @click="setTradeInfo()" class="w-50 ml-4" variant="outline-dark">Save</b-button>
          </div>
        </template>
      </b-card>
      <b-card header-tag="header" footer-tag="footer" class="rpay-card" v-else>
        <div class="mt-5 mx-5 text-center">
          <div class="text-danger">Please mint this item before setting up sale information</div>
        </div>
        <template v-slot:footer>
          <div class="footer-container">
            <div>
              <div class="d-flex justify-content-end">
                <b-button class="round-btn mx-1" variant="warning" @click.prevent="back()">Back</b-button>
              </div>
            </div>
          </div>
        </template>
      </b-card>
    </b-card-group>
  </div>
</div>
<div v-else>
  Waiting for asset.
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import SellingOptions from './selling-screens/SellingOptions'
import SellingHeader from './selling-screens/SellingHeader'

export default {
  name: 'SellingFlow',
  components: {
    SellingOptions,
    SellingHeader
  },
  data () {
    return {
      componentKey: 0,
      errorMessage: null,
      sellingMessage: null,
      loading: true
    }
  },
  mounted () {
    this.errorMessage = null
    const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
    const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](configuration.gaiaAsset.assetHash)
    configuration.gaiaAsset.saleData = contractAsset.saleData
    // configuration.gaiaAsset.saleData.buyNowOrStartingPrice = utils.fromMicroAmount(configuration.gaiaAsset.saleData.buyNowOrStartingPrice)
    // configuration.gaiaAsset.saleData.incrementPrice = utils.fromMicroAmount(configuration.gaiaAsset.saleData.incrementPrice)
    // configuration.gaiaAsset.saleData.reservePrice = utils.fromMicroAmount(configuration.gaiaAsset.saleData.reservePrice)

    this.$store.commit('rpayStore/addConfiguration', configuration)
    this.$store.commit('rpayCategoryStore/setModalMessage', '')
    this.$store.dispatch('rpayStacksStore/fetchMacSkyWalletInfo').then(() => {
      this.$store.commit('rpayStore/setDisplayCard', 100)
      this.loading = false
    }).catch(() => {
      this.loading = false
      this.setPage()
    })
  },
  methods: {
    back: function () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      configuration.opcode = 'save-selling-data'
      window.eventBus.$emit('rpayEvent', configuration)
    },
    minted () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](configuration.gaiaAsset.assetHash)
      return contractAsset
    },
    setTradeInfo () {
      this.errorMessage = null
      if (!this.isValid()) return
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](configuration.gaiaAsset.assetHash)
      const network = this.$store.getters[APP_CONSTANTS.KEY_PREFERRED_NETWORK]
      const data = {
        contractAddress: network.contractAddress,
        contractName: network.contractName,
        owner: contractAsset.owner,
        assetHash: configuration.gaiaAsset.assetHash,
        nftIndex: contractAsset.nftIndex,
        saleData: configuration.gaiaAsset.saleData
      }
      this.$store.dispatch('rpayPurchaseStore/setTradeInfo', data).then((result) => {
        this.result = result
        this.$notify({ type: 'success', title: 'Reserve Price', text: 'Transaction sent! Check the explorer for progress - people will be able to buy this item once it completes!' })
      }).catch((error) => {
        console.log(error)
        this.sellingMessage = null
        this.$notify({ type: 'danger', title: 'Sell Error', text: 'There was an error setting sale info' })
      })
    },
    isValid: function () {
      this.errorMessage = null
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      const saleData = configuration.gaiaAsset.saleData
      if (saleData.saleType < 0 || saleData.saleType > 3) {
        this.$notify({ type: 'danger', title: 'Sell Error', text: 'Sale type outside of allowed range' })
        return false
      }
      if (saleData.saleType === 2) {
        if (!saleData.biddingEndTime) {
          this.$notify({ type: 'danger', title: 'Sell Error', text: 'Please select end time for for bidding' })
          return false
        }
        if (!saleData.incrementPrice || saleData.incrementPrice < 0) {
          this.$notify({ type: 'danger', title: 'Sell Error', text: 'Please enter the increment for bidding' })
          return false
        }
        if (!saleData.buyNowOrStartingPrice || saleData.buyNowOrStartingPrice < 0) {
          this.$notify({ type: 'danger', title: 'Sell Error', text: 'Please enter the buy now / starting price for bidding' })
          return false
        }
        if (!saleData.reservePrice || saleData.reservePrice < 0) {
          this.$notify({ type: 'error', title: 'Reserve Price', text: 'Please enter the reserve.' })
          return false
        }
      } else if (saleData.saleType === 1) {
        if (!saleData.buyNowOrStartingPrice || saleData.buyNowOrStartingPrice < 0) {
          this.$notify({ type: 'error', title: 'Reserve Price', text: 'Please enter the buy now / starting price for bidding.' })
          return false
        }
      }
      return true
    },
    setPage () {
      this.loading = false
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      if (!displayCard) {
        this.$store.commit('rpayStore/setDisplayCard', 100)
      }
    },
    updateSaleDataInfo (data) {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      const saleDataTemp = configuration.gaiaAsset.saleData
      if (data.moneyField) {
        saleDataTemp[data.field] = data.value
      } else {
        saleDataTemp[data.field] = parseInt(data.value)
      }
      /**
      if (this.isValid()) {
        configuration.gaiaAsset.saleData = saleDataTemp
        this.$store.commit('rpayStore/addConfiguration', configuration)
      }
      **/
    }
  },
  computed: {
    saleData () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      const gaiaAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](configuration.gaiaAsset.assetHash)
      const saleData = gaiaAsset.saleData
      return saleData
    },
    configuration () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_CONFIGURATION]
      return configuration
    },
    displayCard () {
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      return displayCard
    }
  }
}
</script>
<style lang="scss" scoped>
</style>