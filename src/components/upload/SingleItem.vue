<template>
<div>
  <div class="" :style="bannerImage">
  </div>
  <div>
    <ItemActionMenu @performAction="performAction" :assetHash="item.assetHash" :variant="'white'" />
  </div>
  <div class="text-center py-1 pb-3 bg-light text-small">
    <div v-if="item.name"><h3 class="h2-modal"><b-link router-tag="a" :to="assetUrl">{{item.name}}</b-link></h3></div>
    <div v-else><h3 class="h2-modal">Unkown</h3></div>
    <div v-if="item.name">by <span class="text-success">{{item.artist}}</span></div>
    <div v-else>by <span class="text-success">TBD</span></div>
    <div v-if="contractAsset" class="mt-4 text-dark"><span >NFT #{{contractAsset.nftIndex}}</span></div>
    <div v-else class="mt-4 text-dark"><span >not minted</span></div>
  </div>
</div>
</template>

<script>
import utils from '@/services/utils'
import { APP_CONSTANTS } from '@/app-constants'
import ItemActionMenu from '@/components/items/ItemActionMenu'

export default {
  name: 'SingleItem',
  components: {
    ItemActionMenu
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
    performAction: function (data) {
      console.log(data)
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
    }
  },
  computed: {
    contractAsset () {
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.item.assetHash)
      return contractAsset
    },
    videoOptions () {
      let file = this.item.attributes.artworkFile
      if (!file) {
        file = this.item.attributes.artworkClip
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
        poster: (this.item.attributes.coverImage) ? this.item.attributes.coverImage.fileUrl : null,
        sources: [
          { src: file.fileUrl, type: file.type }
        ],
        fluid: false
      }
      return videoOptions
    },
    bannerImage () {
      let imageUrl = this.waitingImage
      if (this.item.attributes && this.item.attributes.coverImage) {
        imageUrl = this.item.attributes.coverImage.fileUrl
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
