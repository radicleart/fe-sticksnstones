<template>
<div class="container">
  <div class="container d-flex justify-content-lg-between justify-content-center mb-5 gallery__collections">
    <div class="gallery__collections--whitespace d-lg-block d-none"></div>
    <div>
      <h1>NFT Public Gallery</h1>
    </div>
    <div class="gallery__collections--view-all d-lg-block d-none">
    </div>
  </div>
  <div class="container my-5" v-if="resultSet && resultSet.length > 0">
    <div class="row">
      <div v-for="(item, index) in resultSet" :key="index" class="col-md-3 col-6" >
        <div class="mb-4 gallery__items" v-if="index < 4">
          <GalleryNft class="mb-2" :item="item"/>
              </div>
            </div>
        </div>
      </div>
    <div class="container" style="min-height: 85vh;" v-else>
  <b-container class="text-white mt-5">
    <h1>No Gallery NFTs</h1>
    <p>Our Gallery is coming online soon - please come back soon...</p>
  </b-container>
</div>
</div>
</template>

<script>
import GalleryNft from '@/components/marketplace/GalleryNft'

const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'NftGallery',
  components: {
    GalleryNft
  },
  data () {
    return {
      resultSet: [],
      loaded: false
    }
  },
  mounted () {
    this.findAssets()
  },
  methods: {
    findAssets () {
      // const pid = STX_CONTRACT_NAME.split('-')[0]
      this.$store.dispatch('rpaySearchStore/findByProjectId', STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME).then((results) => {
        this.resultSet = results
      })
    }
  },
  computed: {
  }
}
</script>
