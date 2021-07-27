<template>
<section v-if="content">

  <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto mt-3 ">
          <b-nav-item href="#"><a class="text-nowrap text-white mx-md-5 mx-sm-3" v-scroll-to="{ offset: -60, element: '#identity', duration: 1000 }" href="#identity">Get Your Stacks Wallet</a></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap text-white mx-md-5 mx-sm-3" v-scroll-to="{ offset: -60, element: '#testnet', duration: 1000 }" href="#testnet">Upload Your Item</a></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap text-white mx-md-5 mx-sm-3" v-scroll-to="{ offset: -80, element: '#market', duration: 1000 }" href="#market">Mint Your NFT</a></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap text-white mx-md-5 mx-sm-3" v-scroll-to="{ offset: -60, element: '#clarity', duration: 1000 }" href="#clarity">Set Royalties for Your NFTs</a></b-nav-item>
        </b-navbar-nav>
      <HSection1 />
      <HSection2 />
      <HSection3 />
      <HSection4 />
</section>
</template>

<script>
import HSection1 from '@/components/howitworks/HSection1'
import HSection2 from '@/components/howitworks/HSection2'
import HSection3 from '@/components/howitworks/HSection3'
import HSection4 from '@/components/howitworks/HSection4'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'HowItWorks',
  components: {
    HSection1,
    HSection2,
    HSection3,
    HSection4
  },
  data () {
    return {
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
      // const pageId = this.$route.params.pageId
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_HOW]
      return content
    }
  }
}
</script>

<style>
#deep-logos li {
  cursor: pointer;
}
.text-nowrap {
  white-space: nowrap;
}
.link-panel {
  position: sticky;
  top: 0;
  z-index: 100;
}
.link-panel--container {
  width: 100%;
  padding: 30px 0;
  box-shadow: 0px 3px 6px #00000029;
}
.link-panel--content {
  width: 50%;
  color: #333333;
  font-size: 1.4rem;
}

/* Link panel responsive design */
@media only screen and (max-width: 768px) {
  .link-panel--content {
    width: 70%;
  }
}
@media only screen and (max-width: 600px) {
  .link-panel--content {
    width: 100%;
  }
}
@media only screen and (max-width: 376px) {
  .link-panel--content {
    font-size: 1.2rem;
  }
}
</style>
