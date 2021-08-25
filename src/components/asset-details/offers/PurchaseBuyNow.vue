<template>
<b-container>
  <b-row class="p-5 row mt-2">
    <b-col cols="12">
      <h1><span class="mr-5 text-black">Buy Now</span> {{contractAsset.saleData.buyNowOrStartingPrice}} STX</h1>
    </b-col>
    <b-col cols="12">
      <RatesListing :message="''" :amount="contractAsset.saleData.buyNowOrStartingPrice"/>
    </b-col>
    <b-col class="mt-5" cols="12">
      <b-button @click="$emit('buyNow')">BUY NOW</b-button>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import RatesListing from '@/components/toolkit/RatesListing'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'PurchaseBuyNow',
  components: {
    RatesListing
  },
  props: ['contractAsset'],
  data () {
    return {
      loading: true,
      formSubmitted: false,
      errorMessage: null,
      defaultRate: null
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    rateMessage: function () {
      return 'Buy now for' + this.contractAsset.saleData.buyNowOrStartingPrice + ' STX'
    }
  },
  computed: {
    fbet () {
      return this.$store.getters[APP_CONSTANTS.KEY_FORMATTED_BIDDING_END_TIME](this.contractAsset)
    }
  }
}
</script>
<style lang="scss" scoped>
.input-group-text {
  background: #fff;
  color: #000;
}
</style>
