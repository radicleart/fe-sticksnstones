<template>
<div>
  <section id="developers" class="developers">
     <b-container style="min-height: 18vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 18vh">
        <b-col md="8" sm="10" align-self="center">
        <prismic-items :prismicItems="content.title1"></prismic-items>
       </b-col>
     </b-row>
   </b-container>
      <b-container style="min-height: 60vh" class="pb-4 text-left">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
            <prismic-items :prismicItems="content.text1"></prismic-items>
        </b-col>
     </b-row>
   </b-container>
  </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'

export default {
  name: 'Developers',
  components: {
    PrismicItems
  },
  props: ['Developers'],
  data () {
    return {
      response: null
    }
  },
  methods: {
    changeModel (name) {
      this.currentModel = this.rootPath + name
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getDevelopers']
      return content
    }
  }
}
</script>
<style scoped >
#developers {
min-width: 300px;
 min-height: 300px;
 padding: 20px;
 height: auto;
}
.h1{
text-align: left;
}
</style>
