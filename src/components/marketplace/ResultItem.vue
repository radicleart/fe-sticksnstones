<template>
<div class="text-right">
  <div>
    <MediaItem :videoOptions="videoOptions" :dims="dims" :attributes="result.attributes" :targetItem="'coverImage'"/>
  </div>
  <div class="text-center py-1 py-3 bg-light text-small">
    <div v-if="result.name"><h3 class="h2-modal"><b-link router-tag="a" :to="assetUrl">{{result.name}}</b-link></h3></div>
    <div v-else><h3 class="h2-modal">Unknown</h3></div>
    <div v-if="result.name">by <span class="text-success">{{result.artist}}</span></div>
    <div v-else>by <span class="text-success">TBD</span></div>
    <div v-if="contractAsset" class="mt-4 text-dark"><span >NFT #{{contractAsset.nftIndex}}</span></div>
    <div v-else class="mt-4 text-dark"><span >not minted</span></div>
  </div>
</div>
</template>

<script>
import MediaItem from '@/components/upload/MediaItem'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'ResultItem',
  components: {
    MediaItem
  },
  props: ['result'],
  data () {
    return {
      dims: { width: 'auto', height: 202 },
      waitingImage: 'https://images.prismic.io/radsoc/f60d92d0-f733-46e2-9cb7-c59e33a15fc1_download.jpeg?auto=compress,format'
    }
  },
  methods: {
  },
  computed: {
    assetUrl () {
      let assetUrl = '/assets/' + this.result.assetHash + '#app'
      if (this.$route.name === 'my-items') {
        assetUrl = '/my-items/' + this.result.assetHash
      }
      return assetUrl
    },
    contractAsset () {
      const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.result.assetHash)
      return contractAsset
    },
    videoOptions () {
      const videoOptions = {
        emitOnHover: true,
        playOnHover: true,
        assetHash: this.result.assetHash,
        bigPlayer: false,
        autoplay: false,
        muted: true,
        controls: true,
        showMeta: false,
        aspectRatio: '1:1',
        poster: (this.result.attributes.coverImage) ? this.result.attributes.coverImage.fileUrl : null,
        sources: [],
        fluid: false
      }
      if (this.result.attributes.artworkFile) {
        videoOptions.sources = [
          { src: this.result.attributes.artworkFile.fileUrl, type: this.result.attributes.artworkFile.type }
        ]
      }
      if (this.outerOptions) {
        Object.assign(videoOptions, this.outerOptions)
      }
      return videoOptions
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
