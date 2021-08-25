<template>
<b-card-text class="mx-2">
  <div class="mx-2" v-if="!showSaleData">
    <h4 class="label">Choose Sale type</h4>
    <div class="mx-5 mb-3">
      <b-button class="w-100" @click="changeSellingOption(0)" :variant="(contractAsset.saleData.saleType === 0) ? 'warning' : 'light'"><span>Not On Sale</span></b-button>
    </div>
    <div class="mx-5 mb-3">
      <b-button class="w-100" @click="changeSellingOption(1)" :variant="(contractAsset.saleData.saleType === 1) ? 'warning' : 'light'"><span>Buy Now</span></b-button>
    </div>
  </div>
  <div class="mt-5 mx-5" v-if="showSaleData">
    <p class="text-right"><a href="#" @click.prevent="showSaleData = !showSaleData"><b-icon icon="chevron-left"/>back</a></p>
    <NotForSale :contractAsset="contractAsset" v-if="contractAsset.saleData.saleType === 0" v-on="$listeners"/>
    <BuyNowTradeInfo :contractAsset="contractAsset" v-if="contractAsset.saleData.saleType === 1" v-on="$listeners"/>
  </div>
</b-card-text>
</template>

<script>
import BuyNowTradeInfo from './forms/BuyNowTradeInfo'
import NotForSale from './forms/NotForSale'
import moment from 'moment'

export default {
  name: 'SellingOptions',
  components: {
    BuyNowTradeInfo,
    NotForSale
  },
  props: ['contractAsset'],
  data () {
    return {
      showSaleData: false
    }
  },
  mounted () {
    const saleData = this.contractAsset.saleData
    if (!saleData.biddingEndTime) {
      saleData.biddingEndTime = String(moment().unix())
    }
  },
  methods: {
    changeSellingOption: function (saleType) {
      this.showSaleData = true
      this.contractAsset.saleData.saleType = saleType
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
</style>
