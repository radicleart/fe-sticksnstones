<template>
<section id="homeSection" v-if="slices">
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <slices-block :rootId="'home-slice-'" :slices="slices" class="outer-container"/>
      </div>
    </div>
    <choose-handler class="row" />
  </div>
</section>
</template>

<script>
import SlicesBlock from '@/components/prismic/SlicesBlock'
import ChooseHandler from '@/components/items/ChooseHandler'

export default {
  name: 'Home',
  components: {
    SlicesBlock,
    ChooseHandler
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
  },
  computed: {
    slices () {
      const content = this.$store.getters['contentStore/getHomepage']
      return (content) ? content.body : null
    },
    buttonLabel () {
      const content = this.$store.getters['contentStore/getHomepage']
      if (!content) return null
      return content.credits[0].text
    }
  }
}
</script>

<style>
</style>
