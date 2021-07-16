<template>
<div v-if="content">
  <!-- <div class="p-5">
    <b-navbar toggleable="md" class="p-5" fixed="top" type="dark" variant="black">
      <b-navbar-brand href="#"><b-link to="/"><img height="30px" :src="logo" /></b-link></b-navbar-brand> -->

      <!-- <b-navbar-toggle target="nav-collapse" class="text-white">
        <template #default="{ expanded }">
          <img width="60px" height="30px" class="text-white" v-if="expanded" :src="cross">
          <img width="60px" height="30px" class="text-white" v-else :src="grid">
        </template>
      </b-navbar-toggle> -->

      <!-- <b-collapse id="nav-collapse" is-nav align="center"> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto mt-3 ">
          <b-nav-item href="#"><router-link to="/my-items/all">Your NFTs</router-link></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap mx-md-5 mx-sm-3" v-scroll-to="{ offset: -60, element: '#mint', duration: 1000 }" href="#mint">Mint A File</a></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap mx-md-5 mx-sm-3" v-scroll-to="{ offset: -80, element: '#artists', duration: 1000 }" href="#artists">Artists</a></b-nav-item>
          <b-nav-item href="#"><a class="text-nowrap mx-md-5 mx-sm-3" v-scroll-to="{ offset: -60, element: '#applications', duration: 1000 }" href="#applications">Applications</a></b-nav-item>
        </b-navbar-nav>

        <!-- <b-navbar-nav class="ml-auto"> -->
          <!-- <b-nav-item><b-link class="text-white top-content" to="/about"><img height="30px" :src="wtf" alt="about link"/></b-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> --> -->
  <!-- </div> -->
  <nft-1 :content="content"></nft-1>
  <nft-2 :content="content"></nft-2>
  <nft-3 :content="content"></nft-3>
</div>
</template>

<script>
import NSection1 from '@/components/nft/NSection1'
import NSection2 from '@/components/nft/NSection2'
import NSection3 from '@/components/nft/NSection3'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Gallery',
  components: {
    NSection1,
    NSection2,
    NSection3
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
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_ABOUT]
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
