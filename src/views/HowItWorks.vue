<template>
<div v-if="content">
      <h-section-1 :content="content"></h-section-1>
      <h-section-2 :content="content"></h-section-2>
      <h-section-3 :content="content"></h-section-3>
      <h-section-4 :content="content"></h-section-4>
</div>
</template>

<script>
import HSection1 from '@/components/howitworks/HSection1'
import HSection2 from '@/components/howitworks/HSection2'
import HSection3 from '@/components/howitworks/HSection3'
import HSection4 from '@/components/howitworks/HSection4'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'howitworks',
  components: {
    HSection1,
    HSection2,
    HSection3,
    HSection4
  },
  props: ['howitworks'],
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
