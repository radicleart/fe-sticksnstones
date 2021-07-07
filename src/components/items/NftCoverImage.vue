<template>
<div>
  <div class="bg-white" style="width:100%;">
    <media-item v-if="hasFile()" :videoOptions="videoOptions" :dims="dims" :nftMedia="item.nftMedia" :targetItem="'coverImage'" @deleteMediaItem="deleteMediaItem"/>
    <media-upload v-else class="text-center" :myUploadId="'coverImage'" :dims="dims" :contentModel="contentModel" :mediaFiles="mediaFilesImage()" :limit="1" :sizeLimit="2" :mediaTypes="'image'" @updateMedia="updateMedia($event)"/>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import MediaItem from '@/components/utils/MediaItem'
import MediaUpload from '@/components/utils/MediaUpload'

export default {
  name: 'NftCoverImage',
  components: {
    MediaItem,
    MediaUpload
  },
  props: ['item'],
  data: function () {
    return {
      dims: { width: 360, height: 202 },
      contentModel: {
        id: 'coverImage',
        title: 'Upload a Cover Image<br/><span style="font-size: 1.2rem;">up to 1M</span>',
        buttonName: 'Drop Image',
        iconName: 'file-image',
        errorMessage: 'A image file is required.',
        popoverBody: 'Your cover image.'
      }
    }
  },
  methods: {
    updateMedia: function (data) {
      if (data.startLoad) {
        this.$store.commit('setModalMessage', data.startLoad)
        this.$root.$emit('bv::show::modal', 'waiting-modal')
      } else if (data.errorMessage) {
        this.$store.commit('setModalMessage', data.errorMessage)
      } else if (data.media && data.media.dataHash) {
        const $self = this
        this.$store.commit('setModalMessage', 'Fetched. Saving file info to library.')
        this.$store.dispatch('myItemStore/saveAttributesObject', { assetHash: this.item.assetHash, nftMedia: data.media }).then((nftMedia) => {
          const myAsset = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.item.assetHash)
          myAsset.nftMedia[nftMedia.id] = nftMedia
          $self.$store.dispatch('myItemStore/saveItem', myAsset).then((item) => {
            $self.item = item
            $self.$store.commit('setModalMessage', '')
            $self.$root.$emit('bv::hide::modal', 'waiting-modal')
            $self.componentKey++
          }).catch((error) => {
            $self.$store.commit('setModalMessage', 'Error occurred processing file upload.')
            $self.result = error
          })
        })
      }
    },
    mediaFilesImage () {
      const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.item.assetHash)
      if (!item) return
      const files = []
      if (item.nftMedia.coverImage && item.nftMedia.coverImage.dataUrl) {
        files.push(item.nftMedia.coverImage)
      }
      return files
    },
    hasFile () {
      return this.item.nftMedia.coverImage && this.item.nftMedia.coverImage.fileUrl
    },
    downable: function () {
      return this.uploadState > 2
    },
    deleteMediaItem: function (mediaId) {
      this.$store.dispatch('myItemStore/deleteMediaItem', { item: this.item, id: mediaId }).then(() => {
        this.$emit('delete-cover')
      })
    }
  },
  computed: {
    videoOptions () {
      const myAsset = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.item.assetHash)
      const videoOptions = {
        emitOnHover: true,
        playOnHover: true,
        bigPlayer: false,
        showMeta: true,
        assetHash: this.item.assetHash,
        autoplay: false,
        muted: true,
        controls: true,
        poster: (myAsset && myAsset.nftMedia.coverImage) ? myAsset.nftMedia.coverImage.fileUrl : null,
        fluid: true
      }
      if (!myAsset.nftMedia.artworkFile && myAsset.nftMedia.coverImage) {
        myAsset.nftMedia.artworkFile = myAsset.nftMedia.coverImage
      }
      if (myAsset && myAsset.nftMedia) {
        videoOptions.poster = (myAsset.nftMedia.coverImage) ? myAsset.nftMedia.coverImage.fileUrl : null
        videoOptions.sources = [
          { src: myAsset.nftMedia.artworkFile.fileUrl, type: myAsset.nftMedia.artworkFile.type }
        ]
      }
      return videoOptions
    }
  }
}
</script>

<style scoped>
</style>
