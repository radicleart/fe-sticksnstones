<template>
<section v-if="content">
  <b-container class="">
    <PrismicItems :prismicItems="content.data.site-title" />
    <PrismicItems :prismicItems="content.data.text" />
    <PrismicItems :prismicItems="content.data.credits" />
  </b-container>
  <b-container class="mt-5 pt-5" v-if="loaded">
    <div><WalletStates @evt-loaded="setLoaded"/></div>
    <div><Gallery @evt-loaded="setLoaded"/></div>
  </b-container>
  <b-container v-else class="center text-center">
    <LoopbombSpinner />
    <div>Making daisy chains... back soon.</div>
  </b-container>
</section>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
import { APP_CONSTANTS } from '@/app-constants'
import Gallery from '@/components/marketplace/Gallery'
import WalletStates from '@/components/toolkit/wallet-flow/WalletStates'
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'Home',
  components: {
    PrismicItems,
    LoopbombSpinner,
    WalletStates,
    Gallery
  },
  data () {
    return {
      loaded: true
    }
  },
  methods: {
    changeModel (name) {
      this.currentModel = this.rootPath + name
    }
  },
  computed: {
    sectionDimensions () {
      const height = this.$store.getters[APP_CONSTANTS.KEY_SECTION_HEIGHT]
      return 'min-height: ' + height + 'px; width: auto;'
    },
    content () {
      const pageId = this.$route.params.pageId
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_INFO_PAGE](pageId)
      return content
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
