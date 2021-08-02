<template>
<div>
<section id="homepage" class="homepage">
  <b-container class="text-left" fluid="md">
    <prismic-items :prismicItems="content.title"/>
    <prismic-items :prismicItems="content.text1"/>
    <prismic-items :prismicItems="content.title2"/>
    <prismic-items :prismicItems="content.text2"/>
    <prismic-items :prismicItems="content.credits"/>
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
