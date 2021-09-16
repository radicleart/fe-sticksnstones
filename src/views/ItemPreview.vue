<template>
<section class="" id="section-minting">
  <div class="mt-3" v-if="!item">
    {{message}}
  </div>
  <b-container :key="componentKey" class="my-5 pt-5" v-if="item">
    <b-row style="min-height: 40vh" >
      <b-col md="4" sm="12" align-self="start" class="text-center">
        <MediaItemGeneral :classes="'item-image-preview'" :options="options" :mediaItem="getMediaItem().artworkFile"/>
        <div class="text-left text-small mt-3">
          <b-link to="/my-nfts"><b-icon icon="chevron-left"/> Back</b-link>
        </div>
      </b-col>
      <b-col md="8" sm="12" align-self="start" class="mb-4">
        <div>
          <div class="mb-2 d-flex justify-content-between">
            <h2 class="d-block border-bottom mb-5">{{item.name}}</h2>
            <ItemActionMenu :item="item" />
          </div>
        </div>
        <h2>{{item.artist}}</h2>
        <div class="w-100 " v-html="item.description"></div>
        <!--
        <div class="text-small" v-if="pending">
          Transaction has been sent to the blockchain
        </div>
        -->
        <MintInfo :item="item"/>
        <PendingTransactionInfo v-if="txPending.length > 0" :contractAsset="item.contractAsset" :assetHash="item.assetHash"/>
        <div v-else>
          <MintingTools class="w-100" :item="item" v-if="iAmOwner || edition === 0" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</section>
</template>

<script>
import PendingTransactionInfo from '@/components/toolkit/PendingTransactionInfo'
import MintInfo from '@/components/toolkit/mint-setup/MintInfo'
import MintingTools from '@/components/toolkit/MintingTools'
import { APP_CONSTANTS } from '@/app-constants'
import ItemActionMenu from '@/components/items/ItemActionMenu'
import MediaItemGeneral from '@/components/upload/MediaItemGeneral'

export default {
  name: 'ItemPreview',
  components: {
    MintingTools,
    ItemActionMenu,
    PendingTransactionInfo,
    MintInfo,
    MediaItemGeneral
  },
  data: function () {
    return {
      showHash: false,
      pending: false,
      componentKey: 0,
      assetHash: null,
      message: 'No item available...'
    }
  },
  mounted () {
    this.loading = false
    this.assetHash = this.$route.params.assetHash
    this.edition = Number(this.$route.params.edition)
    if (this.edition > 0) {
      this.$store.dispatch('rpayStacksContractStore/fetchAssetByHashAndEdition', { assetHash: this.assetHash, edition: this.edition })
    }
    if (window.eventBus && window.eventBus.$on) {
      const $self = this
      window.eventBus.$on('rpayEvent', function (data) {
        if (data.opcode === 'stx-transaction-sent' || data.opcode === 'stx-transaction-update') {
          // save transaction but not on gaia asset
          if (data.txId) {
            $self.pending = true
            if (data.txStatus !== 'pending') {
              $self.pending = false
            }
            if (data.functionName === 'mint-token') {
              if (data.txStatus !== 'pending') {
                if (data && data.functionName === 'mint-token') {
                  $self.item.mintInfo = {
                    txId: data.txId,
                    txStatus: data.txStatus
                  }
                }
                $self.$store.dispatch('rpayMyItemStore/saveItem', $self.item)
              }
            }
          }
        }
      })
    }
  },
  methods: {
    getMediaItem () {
      const attributes = this.$store.getters[APP_CONSTANTS.KEY_WAITING_IMAGE](this.item)
      return attributes
    },
    deleteMediaItem: function (mediaId) {
      this.$store.dispatch('rpayMyItemStore/deleteMediaItem', { item: this.item, id: mediaId }).then(() => {
        this.$emit('delete-cover')
      })
    },
    preserveWhiteSpace: function (content) {
      return '<span class="text-description" style="white-space: break-spaces;">' + content + '</span>'
    },
    targetItem: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](this.item)
    }
  },
  computed: {
    txPending () {
      let transactions = []
      if (this.item.contractAsset) {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_TX_ID](this.item.contractAsset.nftIndex)
      } else {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_ASSET_HASH](this.item.assetHash)
      }
      return transactions
    },
    options () {
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: true,
        assetHash: this.assetHash,
        autoplay: false,
        muted: false,
        controls: true,
        showMeta: false,
        poster: (this.item.attributes.coverImage) ? this.item.attributes.coverImage.fileUrl : null,
        sources: [
          { src: this.item.attributes.artworkFile.fileUrl, type: this.item.attributes.artworkFile.type }
        ],
        fluid: true
      }
      return videoOptions
    },
    item () {
      // get the item from my uploads - then try my nfts
      let item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
      if (this.edition > 0) {
        item = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSET_BY_HASH_EDITION]({ assetHash: this.assetHash, edition: this.edition })
        if (!item) {
          item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
        }
      }
      return item
    },
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    },
    iAmOwner () {
      if (process.env.VUE_APP_NETWORK === 'local') {
        return this.item.contractAsset && (this.item.contractAsset.owner === 'STFJEDEQB1Y1CQ7F04CS62DCS5MXZVSNXXN413ZG' || this.item.contractAsset.owner === this.profile.stxAddress)
      }
      return this.item.contractAsset && this.item.contractAsset.owner === this.profile.stxAddress
    },
    minted () {
      // const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      // return !this.item.contractAsset && this.item.contractAsset.owner === profile.stxAddress
      return this.item.contractAsset
    },
    attributes () {
      return this.item.attributes
    }
  }
}
</script>

<style>
</style>
