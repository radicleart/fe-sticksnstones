<template>
<section class="" id="section-minting">
  <div class="mt-3" v-if="!item">
    {{message}}
  </div>
  <b-container :key="componentKey" class="my-5 pt-5" v-if="item">
    <b-row style="min-height: 40vh" >
      <b-col md="4" sm="12" align-self="start" class="text-center">
        <div class="">
          <MediaItemGeneral :classes="'item-image-preview'" :options="options" :mediaItem="getMediaItem().artworkFile"/>
        </div>
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
          <h6 class="text-small">By : {{item.artist}}</h6>
        </div>
        <p class="pt-4 text-small" v-html="preserveWhiteSpace(item.description)"></p>
        <MintInfo @update="update" :item="item"/>
        <div>
          <MintingTools @update="update" class="w-100" :item="item" v-if="iAmOwner || edition === 0" />
        </div>
      </b-col>
    </b-row>
  </b-container>
  <b-modal size="md" id="minting-tx-modal">
    <div  class="mt-3" v-if="item">
      <div class="row">
        <div class="col-12">{{item.name}}</div>
      </div>
      <div class="row mb-4">
        <div class="col-12" v-if="txPending">
          <p class="mt-5">Minting in progress - <a :href="transactionUrl" target="_blank">check transaction here</a></p>
          <p class="mt-5">Minting on stacks can take a few minute so make a brew and refresh this
            page when the transaction confirms
          </p>
        </div>
        <div class="col-12" v-else>
          transaction sent to blockchain - reload page..
        </div>
      </div>
    </div>
    <template #modal-footer class="text-center"><div class="w-100"></div></template>
  </b-modal>
</section>
</template>

<script>
import MintInfo from '@/components/toolkit/mint-setup/MintInfo'
import MintingTools from '@/components/toolkit/MintingTools'
import { APP_CONSTANTS } from '@/app-constants'
import MediaItemGeneral from '@/components/upload/MediaItemGeneral'
import ItemActionMenu from '@/components/items/ItemActionMenu'

export default {
  name: 'ItemPreview',
  components: {
    MintingTools,
    MediaItemGeneral,
    ItemActionMenu,
    MintInfo
  },
  data: function () {
    return {
      showHash: false,
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
      this.$store.dispatch('assetGeneralStore/cacheUpdate', { assetHash: this.assetHash })
    }
  },
  methods: {
    update () {
      this.componentKey++
      if (this.txPending) {
        this.$bvModal.show('minting-tx-modal')
      }
    },
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
    transactionUrl: function () {
      if (!this.item.mintInfo || !this.item.mintInfo.txId) return '#'
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + this.item.mintInfo.txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    txPending: function () {
      return this.item.mintInfo && this.item.mintInfo.txId && this.item.mintInfo.txStatus !== 'success'
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
        return this.item.contractAsset && this.item.contractAsset.owner === 'STFJEDEQB1Y1CQ7F04CS62DCS5MXZVSNXXN413ZG'
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
#minting-modal .modal-content {
  border: none !important;
  background-color: transparent !important;
}

</style>
