<template>
<section id="section-minting">
  <div class="mt-3" v-if="!item">
    {{message}}
  </div>
  <b-container class="my-5 pt-5" v-if="item">
    <b-row style="min-height: 40vh" >
      <b-col md="4" sm="12" align-self="start" class="text-center">
        <div  class="bg-white" style="width:100%;">
          <media-item :videoOptions="videoOptions" :dims="dims" :nftMedia="item.nftMedia" :targetItem="'artworkFile'"/>
        </div>
      </b-col>
      <b-col md="8" sm="12" align-self="start" class="mb-4">
        <div>
          <div class="mb-2 d-flex justify-content-between">
            <h2 class="d-block border-bottom mb-5">{{item.name}}</h2>
          </div>
          <h6 class="text-small">By : {{item.artist}}</h6>
        </div>
        <p class="pt-4 text-small" v-html="preserveWhiteSpace(item.description)"></p>
        <h6 class="text-small"><a :href="marketplaceLink()" target="_blank">View on the Xchange</a></h6>
      </b-col>
    </b-row>
  </b-container>
</section>
</template>

<script>
import MediaItem from '@/components/utils/MediaItem'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'ItemDisplay',
  components: {
    MediaItem
  },
  data: function () {
    return {
      dims: { width: 768, height: 432 },
      showHash: false,
      assetHash: null,
      message: 'No item available...'
    }
  },
  mounted () {
    this.loading = false
    if (this.$route.name === 'nft-preview') {
      this.nftIndex = Number(this.$route.params.nftIndex)
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_NFT_INDEX](this.nftIndex)
      if (contractAsset) {
        this.assetHash = contractAsset.tokenInfo.assetHash
      } else {
        this.$store.dispatch('rpayStacksContractStore/getAssetByNftIndex', this.nftIndex).then((contractAsset) => {
          if (contractAsset) {
            this.assetHash = contractAsset.tokenInfo.assetHash
          } else {
            this.$router.push('/')
          }
        })
      }
    } else {
      this.assetHash = this.$route.params.assetHash
      this.$store.dispatch('myItemStore/findItemByAssetHash', this.assetHash).then((item) => {
        if (!item) {
          this.$router.push('/my-items')
        }
      })
    }
  },
  methods: {
    marketplaceLink: function () {
      return process.env.VUE_APP_MARKETPLACE_URL + '/assets/' + this.assetHash
    },
    preserveWhiteSpace: function (content) {
      return '<span class="text-description" style="white-space: break-spaces;">' + content + '</span>'
    },
    targetItem: function () {
      const item = this.$store.getters['myItemStore/myItem'](this.assetHash)
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](item)
    }
  },
  computed: {
    videoOptions () {
      const item = this.$store.getters['myItemStore/myItem'](this.assetHash)
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: true,
        assetHash: this.assetHash,
        autoplay: false,
        muted: false,
        controls: true,
        showMeta: false,
        poster: (item.nftMedia.coverImage) ? item.nftMedia.coverImage.fileUrl : null,
        sources: [
          { src: item.nftMedia.artworkFile.fileUrl, type: item.nftMedia.artworkFile.type }
        ],
        fluid: true
      }
      return videoOptions
    },
    contractAsset () {
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.item.assetHash)
      return contractAsset
    },
    item () {
      const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
      return item
    },
    nftMedia () {
      const item = this.$store.getters['myItemStore/myItem'](this.assetHash)
      return item.nftMedia
    }
  }
}
</script>

<style scoped>
</style>