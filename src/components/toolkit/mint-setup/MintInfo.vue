<template>
<div>
<div class="text-small" v-if="item.contractAsset">
  <b-alert v-if="!publicAssetDetails" show :variant="variant()">
    <b-row>
      <b-col cols="12">
        <span>Minted</span><br/><span class="text-bold">NFT #{{item.contractAsset.nftIndex}} : Edition {{item.contractAsset.tokenInfo.edition}} of {{item.contractAsset.tokenInfo.maxEditions}}</span>
      </b-col>
      <b-col cols="12" class="text-small">
        <span>Owner <b-link router-tag="span" v-b-tooltip.hover="{ variant: 'warning' }"  :title="ttStacksAddress"><b-icon class="ml-2" icon="question-circle"/></b-link>
        </span>
        <br/><span class="">{{item.contractAsset.owner}}</span>
      </b-col>
      <b-col cols="12" class="text-right">
        <a :href="transactionUrl" target="_blank">Show in Explorer</a>
      </b-col>
    </b-row>
  </b-alert>
  <b-alert v-else class="text-small" show :variant="variant()">
    <b-row class="text-small">
      <b-col cols="12">
        <span class="text-small text-bold">NFT #{{item.contractAsset.nftIndex}} : Edition {{item.contractAsset.tokenInfo.edition}} of {{item.contractAsset.tokenInfo.maxEditions}}</span>
      </b-col>
      <b-col cols="12">
        <span>{{item.contractAsset.owner}} <b-link router-tag="span" v-b-tooltip.hover="{ variant: 'warning' }"  :title="ttStacksAddress"><b-icon class="ml-2" icon="question-circle"/></b-link></span>
      </b-col>
      <b-col cols="12" class="text-right">
        <a :href="transactionUrl" target="_blank">Show in Explorer</a>
      </b-col>
    </b-row>
  </b-alert>
</div>
<div class="text-small" v-else-if="minted">
  <b-alert show variant="warning">
    <div class="d-flex justify-content-between">
      <div class="w-100">Minted - reload page? - <a class="text-dark" :href="transactionUrl" target="_blank">Show in Explorer</a></div>
      <div><a class="text-danger" href="#" @click.prevent="checkMinting">check transaction?</a></div>
    </div>
  </b-alert>
</div>
<div class="text-small" v-else-if="txPending">
  <b-alert show variant="warning">
    <div class="d-flex justify-content-between">
      <div class="w-100"><b-icon icon="circle" animation="throb"/> {{item.mintInfo.functionName}} {{item.mintInfo.txStatus}} - <a class="text-dark" :href="transactionUrl" target="_blank">Show in Explorer</a></div>
      <div><a class="text-danger" href="#" @click.prevent="checkMinting">check transaction?</a></div>
    </div>
  </b-alert>
</div>
<div class="text-small" v-else-if="item.mintInfo">
  <b-alert show variant="warning">
    <div class="d-flex justify-content-between" v-if="item.mintInfo">
      <div class="w-100"><b-icon icon="circle" animation="throb"/> {{item.mintInfo.functionName}} {{item.mintInfo.txStatus}} - <a class="text-dark" :href="transactionUrl" target="_blank">Show in Explorer</a></div>
      <div><a class="text-danger" href="#" @click.prevent="reload">reload this page</a></div>
    </div>
  </b-alert>
</div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'MintInfo',
  components: {
  },
  props: ['item'],
  data () {
    return {
    }
  },
  watch: {
    item () {
      if (this.item && this.item.mintInfo) this.checkMinting()
    }
  },
  methods: {
    checkMinting () {
      if (this.item.mintInfo) {
        if (!this.item.mintInfo.txId) {
          this.item.mintInfo = null
          this.$store.dispatch('rpayMyItemStore/saveItem', this.item)
        } else {
          if (this.item.mintInfo.txStatus === 'pending') {
            this.$store.dispatch('rpayTransactionStore/readTransactionInfo', this.item.mintInfo.txId, { root: true }).then((txData) => {
              if (txData.txStatus !== 'pending') {
                this.item.mintInfo = txData
                this.$store.dispatch('rpayMyItemStore/saveItem', this.item)
              }
            })
          }
        }
        if (!this.item.contractAsset) {
          const edition = Number(this.$route.params.edition) || 1
          const ga = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSET_BY_HASH_EDITION]({ assetHash: this.item.assetHash, edition: edition })
          if (ga && ga.contractAsset) this.item.contractAsset = ga.contractAsset
        }
      }
      this.$emit('update')
    },
    variant () {
      let v = (this.iAmOwner) ? 'warning' : 'danger'
      if (this.$route.name === 'asset-by-hash' || this.$route.name === 'asset-by-index') {
        v = (this.iAmOwner) ? 'light' : 'dark'
      }
      return v
    },
    reload () {
      location.reload()
    }
  },
  computed: {
    transactionUrl: function () {
      if (!this.item.mintInfo || !this.item.mintInfo.txId) return '#'
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + this.item.mintInfo.txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    txPending: function () {
      return !this.item.contractAsset && this.item.mintInfo && this.item.mintInfo.txId && this.item.mintInfo.txStatus !== 'success'
    },
    minted: function () {
      return !this.item.contractAsset && this.item.mintInfo && this.item.mintInfo.txId && this.item.mintInfo.txStatus === 'success'
    },
    ttStacksAddress () {
      const tooltip = this.$store.getters[APP_CONSTANTS.KEY_TOOL_TIP]('tt-stacks-address')
      return (tooltip) ? tooltip[0].text : ''
    },
    publicAssetDetails () {
      return (this.$route.name === 'asset-by-hash' || this.$route.name === 'asset-by-index')
    },
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    },
    iAmOwner () {
      return this.item.contractAsset && this.item.contractAsset.owner === this.profile.stxAddress
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
