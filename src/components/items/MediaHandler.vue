<template>
<div v-if="videoOptions">
  <div class="row text-left" v-if="!videoOptions.hideArtworkFile">
    <div class="col-md-4 col-sm-12 mb-4" >
      <media-item :videoOptions="videoOptions" :dims="dims" :nftMedia="nftMedia" :targetItem="'artworkFile'"/>
    </div>
  </div>
  <div class="row text-left">
    <div class="col-md-4 col-sm-12 mb-4" v-if="!videoOptions.hideArtworkClip">
      <media-item :videoOptions="videoOptions" v-if="hasFile('artworkClip')" :dims="dims" :nftMedia="nftMedia" :targetItem="'artworkClip'" v-on="$listeners"/>
      <media-upload v-else :myUploadId="'artworkClip'" :dims="dims" :contentModel="contentModelClip" :limit="1" :sizeLimit="4" :mediaTypes="mediaTypesAllowed" @updateMedia="updateMedia($event)"/>
    </div>
    <div class="col-md-4 col-sm-12 mb-4">
      <media-item :videoOptions="videoOptions" v-if="hasFile('coverImage')" :dims="dims" :nftMedia="nftMedia" :targetItem="'coverImage'" v-on="$listeners"/>
      <media-upload v-else :myUploadId="'coverImage'" :dims="dims" :contentModel="contentModelCoverImage" :limit="1" :sizeLimit="2" :mediaTypes="mediaTypesAllowed" @updateMedia="updateMedia($event)"/>
    </div>
  </div>
</div>
<div v-else>
  <div class="row mb-4">
    <div class="col-sm-12 col-md-4 offset-md-4 mb-3">
      <media-upload :myUploadId="'artworkFile'" :dims="dims" :contentModel="contentModelArtwork" :limit="1" :sizeLimit="20" :mediaTypes="mediaTypesAllowed" @updateMedia="updateMedia($event)"/>
    </div>
  </div>
</div>
</template>

<script>
import MediaUpload from '@/components/utils/MediaUpload'
import MediaItem from '@/components/utils/MediaItem'

export default {
  name: 'MediaHandler',
  components: {
    MediaUpload,
    MediaItem
  },
  props: ['uploadState', 'nftMedia', 'mediaTypesAllowed', 'videoOptions'],
  data: function () {
    return {
      artworkFileUrl: null,
      dims: { width: 360, height: 202 },
      contentModelCoverImage: {
        id: 'coverImage',
        title: 'Cover Image<br/>up to 1M',
        buttonName: 'Choose Cover Image',
        iconName: 'file-image',
        errorMessage: 'A image file is required.',
        popoverBody: 'Your cover image.'
      },
      contentModelClip: {
        id: 'artworkClip',
        title: 'Artwork Clip (up to 2M)',
        buttonName: 'Choose Movie Clip',
        iconName: 'film',
        errorMessage: 'A image file is required.',
        popoverBody: 'Your cover image.'
      },
      contentModelArtwork: {
        id: 'artworkFile',
        title: 'Artwork File<br/>drop a url - up to 200M',
        buttonName: 'Choose NFT File',
        iconName: 'film',
        errorMessage: 'A mp4 file is required',
        popoverBody: 'The artwork file.'
      }
    }
  },
  methods: {
    updateMedia (data) {
      this.$emit('updateMedia', data)
    },
    getMedia (data) {
      this.$emit('updateMedia', data)
    },
    hasFile (file) {
      if (file === 'artworkFile') return this.nftMedia.artworkFile && this.nftMedia.artworkFile.fileUrl
      else if (file === 'artworkClip') return this.nftMedia.artworkClip && this.nftMedia.artworkClip.fileUrl
      else if (file === 'coverImage') return this.nftMedia.coverImage && this.nftMedia.coverImage.fileUrl
    }
  },
  computed: {
    assetHash () {
      const assetHash = this.$route.params.assetHash
      return assetHash
    }
  }
}
</script>

<style scoped>
</style>
