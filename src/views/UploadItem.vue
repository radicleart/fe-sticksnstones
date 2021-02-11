<template>
<div v-if="loaded">
  <div class="row">
    <div class="col-9 py-5 admin-app">
      <div class="container">
        <p class="text-40-300">Connect Your Own Work</p>
        <p class="text2">About your Item</p>
        <div class="row">
          <div class="col-md-4 col-sm-12">
            <div class="mb-2">
              <div :style="bannerImage" v-if="files && files.length === 0" class="d-flex align-items-center flex-column m-2 p-2 bg-white border" style="width: auto; min-height: 250px;">
                <div class="mt-5 my-auto text-center">
                  <media-upload class="" :dims="dims" :contentModel="contentModel1" :showFiles="true" :mediaFiles="mediaFiles1" :limit="1" :sizeLimit="2000000" :mediaTypes="'image'" @updateMedia="setByEventLogo1($event)"/>
                </div>
              </div>
              <div v-else :style="bannerImage" class="d-flex align-items-end flex-column" style="width: auto; min-height: 250px;">
                <span class="bg-dark p-1 mt-auto" style="position: relative; bottom: 0;">
                  <a class="text-white" href="#" @click.prevent="files = []" v-if="files && files.length > 0">change</a>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-8 col-sm-12">
            <b-form>
              <div class="mb-4">
                <div class="text2">Name of Item</div>
                <b-input
                  id="name"
                  v-model="item.name"
                  ></b-input>
              </div>
              <div class="mb-4">
                <b-form-checkbox size="lg" v-model="item.private" name="check-button" switch>
                  <span v-if="!item.private"><b>make it public</b> the item will be listed on our marketplace</span>
                  <span v-else><b>keep it private for now</b></span>
                </b-form-checkbox>
              </div>
              <div class="mb-4">
                <div class="text2">Short Description</div>
                <b-textarea
                  ref="description"
                  v-model="item.description"
                  rows="5"
                  style="padding: 20px 20px;"
                  ></b-textarea>
              </div>
              <div class="mb-4">
                <div class="text2">Creator D-ID <a href="#" @click.prevent="useMyAddress()">(use my username)</a></div>
                <b-input
                  id="creatorDID"
                  ref="creatorDID"
                  v-model="item.creatorDID"
                  ></b-input>
              </div>
              <div class="mb-2" v-if="valid">
                <b-button variant="info" class="mt-3 mr-3 btn-lg" style="text-transform: capitalize; font-size: 1.4rem;" @click.prevent="saveApplication()">Save Application</b-button>
                <!-- <b-button variant="danger" class="mt-3 btn-lg" style="text-transform: capitalize; font-size: 14px;" to="/admin-app">Back</b-button> -->
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
import MediaUpload from '@/components/utils/MediaUpload'

export default {
  name: 'UpdateApplication',
  components: {
    MediaUpload
  },
  data () {
    return {
      loading: true,
      itemUUID: null,
      loaded: false,
      dims: { width: 250, height: 250 },
      result: 'Saving data to your storage - back in a mo!',
      item: {
        owner: null,
        private: false,
        creatorDID: null,
        name: '',
        description: ''
      },
      contentModel1: {
        title: 'Upload artwork image <br/> (250x250 px)',
        errorMessage: 'A file is required.',
        popoverBody: 'Your artwork image.'
      },
      files: [],
      doValidate: true,
      defaultBadge: require('@/assets/img/risidio_collection_logo.svg'),
      defaultBadgeData: null
    }
  },
  mounted () {
    this.itemUUID = this.$route.params.itemUUID
    if (!this.itemUUID) {
      this.loaded = true
    } else {
      this.$store.dispatch('myItemStore/findItemByUUID', this.itemUUID).then((item) => {
        if (!item) {
          this.$router.push('/404')
          return
        }
        this.item = item
        this.setImage(item.imageUrl)
        if (item.imageUrl) this.item.imageUrl = item.imageUrl
        this.loaded = true
      })
    }
  },
  methods: {
    useMyAddress: function () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      this.item.creatorDID = profile.username
    },
    setByEventLogo1 (data) {
      this.files = data.media
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
    fileName () {
      if (this.files && this.files.length === 0) {
        return
      }
      const filename = this.files[0].name
      return filename.split(/\./)[0]
    },
    validate: function () {
      let result = true
      if (!this.item.name) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please enter the name of your artwork' })
        result = false
      }
      if (!this.files || this.files.length === 0) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please upload an image to list with your item' })
        result = false
      }
      if (!this.item.description) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please enter a short description of your artwork' })
        result = false
      }
      if (!this.files.length > 0) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please upload an artwork image or accompanying image' })
        result = false
      }
      return result
    },
    valid () {
      return this.item.name && this.item.description
    },
    saveApplication: function () {
      if (this.doValidate && !this.validate()) return
      let imageData = this.defaultBadgeData
      if (this.files && this.files.length === 1) {
        imageData = utils.getBase64FromImageUrl(this.files[0].dataUrl)
      }
      this.showWaitingModal = true
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      this.item.owner = profile.username
      this.item.filename = this.files[0].name
      this.$root.$emit('bv::show::modal', 'waiting-modal')
      this.$store.dispatch('myItemStore/saveItem', { item: this.item, imageData: imageData }).then(() => {
        // this.$router.push('/my-app/' + item.itemUUID)
        this.$root.$emit('bv::hide::modal', 'waiting-modal')
        this.$root.$emit('bv::show::modal', 'success-modal')
        this.$store.commit('setModalMessage', 'Your artwork is now uploaded to your personal cloud.')
      }).catch((error) => {
        this.$store.commit('setModalMessage', 'Error occurred processing transaction.')
        this.result = error
      })
    }
  },
  computed: {
    mediaFiles1 () {
      let files = []
      if (this.files.length > 0) {
        files = this.files
      }
      return files
    },
    contractAddressUser () {
      return this.$store.getters[APP_CONSTANTS.KEY_PROFILE].stxAddress
    },
    bannerImage () {
      if (!this.files || this.files.length === 0) {
        return
      }
      return {
        padding: '0 0 0 0',
        'min-height': '250px',
        width: '100%',
        'background-repeat': 'no-repeat',
        'background-image': `url(${this.files[0].dataUrl})`,
        'background-position': 'center center',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover',
        opacity: 1
      }
    }
  }
}
</script>
<style lang="scss" >
</style>
