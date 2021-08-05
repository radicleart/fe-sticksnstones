<template>
<div v-if="content">
<section id="homepage" class="homepage">
  <b-container class="text-left" fluid="md">
    <b-row align-h="center" style="min-height: 61vh">
      <b-col md="20" align-self="center">
    <prismic-items :prismicItems="content.title"/>
    <prismic-items :prismicItems="content.text1"/>
    <b-row align-h="center" style="min-height: 61vh">
      <b-col md="10" align-self="center">
    <prismic-items :prismicItems="content.title2"/>
    <prismic-items :prismicItems="content.text2"/>
    <prismic-items :prismicItems="content.credits"/>
    </b-col>
    </b-row>
      </b-col>
    </b-row>
  </b-container>
</section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'home',
  components: {
    PrismicItems
  },
  props: ['home'],
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
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_HOME]
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
