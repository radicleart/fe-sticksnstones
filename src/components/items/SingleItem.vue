<template>
<div>
  <div class="py-4 bg-light text-small" :style="bannerImage">
  </div>
  <div class="bg-light text-small d-flex justify-content-end">
    <b-dropdown variant="white" class="bg-none m-0 p-0" no-caret>
      <template #button-content>
        <b-icon icon="three-dots"/>
      </template>
      <b-dropdown-item><b-link :to="'/item-preview/' + item.assetHash"><span class="mb-0">open item</span></b-link></b-dropdown-item>
      <b-dropdown-item><b-link :to="'/edit-item/' + item.assetHash"><span class="mb-0">edit item</span></b-link></b-dropdown-item>
      <b-dropdown-item v-if="!contractAsset"><a href="#" @click.prevent="deleteItem" class="text-danger"><span class="mb-0">delete item</span></a></b-dropdown-item>
    </b-dropdown>
  </div>
  <div class="text-center py-4 bg-light text-small">
    <div class=""><h2 class="h2-modal"><b-link router-tag="a" :to="assetUrl">{{item.name}}</b-link></h2></div>
    <div>by <span class="text-success">{{item.artist}}</span></div>
  </div>
</div>
<!--
<div v-if="item && item.nftMedia" class="mt-1">
  <media-item :videoOptions="videoOptions" :dims="dims" :nftMedia="item.nftMedia" :targetItem="targetItem()"/>
  <div class="">
    <div class="mt-5 mb-2 d-flex justify-content-between">
      <div class="">
        <b-link router-tag="a" :to="assetUrl">{{item.name}}</b-link>
      </div>
      <div>
        <b-link class="mr-2" :to="'/edit-item/' + item.assetHash"><b-icon icon="pencil"></b-icon></b-link>
        <a v-if="!contractAsset" href="#" @click.prevent="deleteItem" class="text-danger"><b-icon icon="trash"></b-icon></a>
      </div>
    </div>
      <div class="text-small text-right">
        <div><b-link router-tag="a" :to="assetUrl">{{salesButtonLabel()}}</b-link></div>
      </div>
  </div>
</div>
-->
</template>

<script>
import utils from '@/services/utils'
import { APP_CONSTANTS } from '@/app-constants'
// import MediaItem from '@/components/utils/MediaItem'

export default {
  name: 'SingleItem',
  components: {
    // MediaItem
  },
  props: ['item'],
  data () {
    return {
      waitingImage: 'https://images.prismic.io/radsoc/f60d92d0-f733-46e2-9cb7-c59e33a15fc1_download.jpeg?auto=compress,format',
      dims: { width: 360, height: 360 },
      likeIconTurquoise: require('@/assets/img/Favorite_button_turquoise_empty.png'),
      likeIconPurple: require('@/assets/img/Favorite_button_purple_empty.png')
    }
  },
  methods: {
    salesButtonLabel () {
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.item.assetHash)
      if (!contractAsset) return 'NOT MINTED'
      return this.$store.getters[APP_CONSTANTS.KEY_SALES_BUTTON_LABEL](contractAsset.saleData.saleType)
    },
    targetItem: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](this.item)
    },
    hoverIn (index) {
      this.dHover[index] = true
      this.componentKey += 1
    },
    isAllowed (opcode) {
      if (opcode === 'delete' || opcode === 'edit') {
        return this.item.nftIndex === -1
      }
    },
    hoverOut () {
      this.dHover = [false, false, false, false, false, false, false, false, false, false, false, false]
      this.componentKey += 1
    },
    toggleFavourite () {
      utils.makeFlasher(this.$refs.lndQrcode)
    },
    deleteItem () {
      this.$store.dispatch('myItemStore/deleteItem', this.item)
    }
  },
  computed: {
    contractAsset () {
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.item.assetHash)
      return contractAsset
    },
    videoOptions () {
      let file = this.item.nftMedia.artworkFile
      if (!file) {
        file = this.item.nftMedia.artworkClip
      }
      if (!file) return {}
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: false,
        assetHash: this.item.assetHash,
        autoplay: false,
        muted: true,
        controls: false,
        showMeta: false,
        aspectRatio: '1:1',
        poster: (this.item.nftMedia.coverImage) ? this.item.nftMedia.coverImage.fileUrl : null,
        sources: [
          { src: file.fileUrl, type: file.type }
        ],
        fluid: false
      }
      return videoOptions
    },
    bannerImage () {
      let imageUrl = this.waitingImage
      if (this.item.nftMedia.coverImage) {
        imageUrl = this.item.nftMedia.coverImage.fileUrl
      }
      return {
        height: '250px',
        width: '100%',
        'background-repeat': 'no-repeat',
        'background-image': `url(${imageUrl})`,
        'background-position': 'center center',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
      }
    },
    assetUrl () {
      if (this.item.assetHash) {
        return '/item-preview/' + this.item.assetHash
      }
      return '/upload-item/' + this.item.assetHash
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
