<template>
<section id="section-upload">
  <b-container v-if="item">
    <b-row v-if="hasFile('coverImage')">
      <b-col class="" md="8" sm="12" align-self="start">
        <h2 class="mb-4"><b-link to="/"><b-icon class="p-2 mr-5 bg-secondary text-white" style="width: 50px; height: 50px; font-size: 1.8rem; font-weight: 900; border-radius: 50%;" icon="chevron-left"/></b-link> <span style="margin-bottom: 20px; font-size: 3.2rem;">NFT Info</span></h2>
        <div class="my-4 bg-danger p-3" v-if="invalidItems.length > 0 && showErrors">
          <div>Required fields:</div>
          <div class="mr-1" v-for="(field, index) in invalidItems" :key="index">{{field}}</div>
        </div>
        <div>
          <ItemFormPart1 v-if="uploadState > 2" @upload-state="updateUploadState" :item="item" :upload="true" :formSubmitted="formSubmitted"/>
          <ItemFormPart2 v-if="uploadState > 3" @upload-state="updateUploadState" :item="item" :upload="true" :formSubmitted="formSubmitted"/>
        </div>
        <div class="my-4 bg-danger p-3" v-if="invalidItems.length > 0 && showErrors">
          <div>Required fields:</div>
          <div class="mr-1 text-white" v-for="(field, index) in invalidItems" :key="index">{{field}}</div>
        </div>
        <div class="my-4 text-right"><b-button class="" variant="warning" @click.prevent="uploadItem()">Continue</b-button></div>
      </b-col>
      <b-col md="4" sm="12" >
        <NftCoverImage :item="item" :displayHeader="false"/>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col md="6" offset-md="3" sm="12" align-self="start" class=" text-center">
        <NftCoverImage :item="item" :displayHeader="true" />
      </b-col>
    </b-row>
  </b-container>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import NftCoverImage from '@/components/upload/NftCoverImage'
import ItemFormPart1 from '@/components/upload/ItemFormPart1'
import ItemFormPart2 from '@/components/upload/ItemFormPart2'
import utils from '@/services/utils'

export default {
  name: 'UpdateItem',
  components: {
    NftCoverImage,
    ItemFormPart1,
    ItemFormPart2
  },
  data () {
    return {
      showAFUpload: false,
      requireClip: false,
      formSubmitted: false,
      dims: { width: 360, height: 202 },
      showErrors: false,
      componentKey: 0,
      uploadState: 10,
      loaded: false,
      result: 'Saving data to your storage - back in a mo!',
      assetHash: null,
      item: null,
      contentModelArtwork: {
        id: 'artworkFile',
        title: 'UPLOAD NFT FILE',
        buttonName: 'CHOOSE A FILE',
        message: 'Your NFT File',
        iconName: 'film',
        errorMessage: 'An image / audio / video / gltf file is required',
        popoverBody: 'The main NFT file.'
      },
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
        title: 'Artwork Clip (up to 2M)<br/>up to 2M',
        buttonName: 'Choose Movie Clip',
        iconName: 'film',
        errorMessage: 'A image file is required.',
        popoverBody: 'Your cover image.'
      },
      doValidate: true,
      defaultBadge: require('@/assets/img/risidio_white.png')
    }
  },
  mounted () {
    this.assetHash = this.$route.params.assetHash
    this.$store.dispatch('rpayMyItemStore/findItemByAssetHash', this.assetHash).then((item) => {
      // this.uploadState++
      if (!item) {
        this.$router.push('/my-nfts')
        return
      }
      this.item = item
      this.loaded = true
    })
  },
  methods: {
    hasFile (file) {
      const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
      if (!item || !item.attributes) return
      if (file === 'artworkFile') return item.attributes.artworkFile && item.attributes.artworkFile.fileUrl
      else if (file === 'artworkClip') return item.attributes.artworkClip && item.attributes.artworkClip.fileUrl
      else if (file === 'coverImage') return item.attributes.coverImage && item.attributes.coverImage.fileUrl
    },
    mediaFilesArtworkFile () {
      const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
      if (!item) return
      const files = []
      if (item.attributes.artworkFile && item.attributes.artworkFile.dataUrl) {
        files.push(item.attributes.artworkFile)
      }
      return files
    },
    deleteMediaItem: function (mediaId) {
      this.$store.dispatch('rpayMyItemStore/deleteMediaItem', { item: this.item, id: mediaId }).then(() => {
        this.$emit('delete-cover')
      })
    },
    updateUploadState: function (data) {
      this.$store.dispatch('rpayMyItemStore/saveItem', this.item).then(() => {
        if (data.change === 'done') {
          this.$router.push(this.itemPreviewUrl)
        } else if (data.change === 'up') {
          this.uploadState++
        } else {
          this.uploadState--
        }
      })
    },
    updateMedia: function (data) {
      if (data.startLoad) {
        this.$store.commit('setModalMessage', data.startLoad)
        this.$root.$emit('bv::show::modal', 'waiting-modal')
      } else if (data.errorMessage) {
        this.$store.commit('setModalMessage', data.errorMessage)
      } else if (data.media && data.media.dataHash) {
        const $self = this
        this.$store.commit('setModalMessage', 'Fetched. Saving file info to library.')
        this.$store.dispatch('rpayMyItemStore/saveAttributesObject', { assetHash: this.assetHash, attributes: data.media }).then((attributes) => {
          const myAsset = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
          myAsset.attributes[attributes.id] = attributes
          $self.$store.dispatch('rpayMyItemStore/saveItem', myAsset).then((item) => {
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
    setImage (trialImage) {
      if (!trialImage) {
        trialImage = this.defaultBadge
      }
      const $self = this
      utils.fetchBase64FromImageUrl(trialImage, document).then((data) => {
        $self.files = [{
          dataUrl: data.dataURL
        }]
      })
    },
    contextTitle: function () {
      if (this.uploadState === 1) return 'Upload your music'
      else if (this.uploadState === 2) return 'Add cover art'
      else if (this.uploadState === 3) return 'Help people find it..'
    },
    uploadItem: function () {
      this.showErrors = false
      const invalidItems = this.$store.getters[APP_CONSTANTS.KEY_ITEM_VALIDITY](this.item)
      if (this.item.editions) this.item.editions = parseInt(this.item.editions)
      if (this.doValidate && invalidItems.length > 0) {
        this.showErrors = true
        this.$notify({ type: 'error', title: 'Upload Error', text: 'Please enter missing data' })
        return
      }
      this.showWaitingModal = true
      this.$store.commit('setModalMessage', 'Uploading... once its saved you\'ll be able to mint this artwork - registering your ownership on the blockchain. Once registered you\'ll be able to prove you own it and be able to benefit from sales and from secondary sales.')
      this.$root.$emit('bv::show::modal', 'waiting-modal')
      this.$store.dispatch('rpayMyItemStore/saveItem', this.item).then(() => {
        this.$root.$emit('bv::hide::modal', 'waiting-modal')
        this.$root.$emit('bv::hide::modal', 'success-modal')
        this.$store.commit('setModalMessage', '')
        this.$router.push(this.itemPreviewUrl)
      }).catch((error) => {
        this.$store.commit('setModalMessage', 'Error occurred processing transaction.')
        this.result = error
      })
    }
  },
  computed: {
    itemPreviewUrl () {
      let edition = 0
      if (this.item.contractAsset) {
        edition = this.item.contractAsset.tokenInfo.edition
      }
      return '/item-preview/' + this.item.assetHash + '/' + edition
    },
    superAdmin: function () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.superAdmin
    },
    myAsset: function () {
      const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](this.assetHash)
      return item
    },
    invalidItems: function () {
      const invalidItems = this.$store.getters[APP_CONSTANTS.KEY_ITEM_VALIDITY](this.item)
      return invalidItems
    },
    itemSummary () {
      const invalidItems = this.$store.getters[APP_CONSTANTS.KEY_ITEM_VALIDITY](this.item)
      return {
        uploadState: this.uploadState,
        displayTitle: 'Preview',
        item: this.item,
        isValid: invalidItems.length === 0,
        context: 'upload'
      }
    }
  }
}
</script>
<style lang="scss" >
#upload-item .drop-zone {
  min-width: 300px;
  min-height: 300px;
  padding: 20px;
  height: auto;
  border-radius: 18px;
  border: 1pt dashed rgb(146, 146, 38);
  text-align: center;
}
#upload-item .badge {
  cursor: pointer;
  padding: 5px !important;
}
</style>
