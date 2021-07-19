<template>
<section id="section-minting">
  <div class="mt-3" v-if="!item">
    {{message}}
  </div>
  <b-container class="my-5 pt-5" v-if="item">
    <b-row style="min-height: 40vh" >
      <b-col md="4" sm="12" align-self="start" class="text-center">
        <div  class="bg-white" style="width:100%;">
          <media-item :videoOptions="videoOptions" :dims="dims" :attributes="item.attributes" :targetItem="'artworkFile'"/>
        </div>
      </b-col>
      <b-col md="8" sm="12" align-self="start" class="mb-4">
        <div>
          <div class="mb-2 d-flex justify-content-between">
            <h2 class="d-block border-bottom mb-5">{{item.name}}</h2>
            <div class="">
              <div class="p-0 m-0 d-flex justify-content-end">
                <ItemActionMenu @performAction="performAction" :assetHash="item.assetHash" :variant="'white'" />
              </div>
            </div>
          </div>
          <div class="mb-2 d-flex justify-content-end">
            <ItemPrivacyMenu @performAction="performAction" :assetHash="item.assetHash" :mode="update" />
          </div>
          <h6 class="text-small">By : {{item.artist}}</h6>
        </div>
        <p class="pt-4 text-small" v-html="preserveWhiteSpace(item.description)"></p>
        <minting-tools class="w-100" :assetHash="item.assetHash" />
      </b-col>
    </b-row>
  </b-container>
</section>
</template>

<script>
import MintingTools from '@/components/toolkit/MintingTools'
import MediaItem from '@/components/upload/MediaItem'
import { APP_CONSTANTS } from '@/app-constants'
import ItemActionMenu from '@/components/items/ItemActionMenu'
import ItemPrivacyMenu from '@/components/upload/ItemPrivacyMenu'

export default {
  name: 'ItemPreview',
  components: {
    MintingTools,
    MediaItem,
    ItemActionMenu,
    ItemPrivacyMenu
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
    this.assetHash = this.$route.params.assetHash
    this.$store.dispatch('myItemStore/findItemByAssetHash', this.assetHash).then((item) => {
      if (!item) {
        this.$router.push('/my-items')
      }
    })
  },
  methods: {
    performAction: function (data) {
      console.log(data)
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
        showMeta: true,
        poster: (item.attributes.coverImage) ? item.attributes.coverImage.fileUrl : null,
        sources: [
          { src: item.attributes.artworkFile.fileUrl, type: item.attributes.artworkFile.type }
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
    attributes () {
      const item = this.$store.getters['myItemStore/myItem'](this.assetHash)
      return item.attributes
    },
    keywords () {
      return this.$store.getters['myItemStore/myItem'](this.assetHash)
    }
  }
}
</script>

<style scoped>
</style>
