<template>
<div v-if="security">
      <section id="security" class="security">
  <prismic-items :prismicItems="content.title3"></prismic-items>
    </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
export default {
  name: 'security',
  components: {
    PrismicItems
  },
  props: ['security'],
  data () {
    return {
      response: null
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getSecurity']
      return content
    }
  }
}
</script>

<style scoped>
.title1{
text-align: left;
}
</style>
