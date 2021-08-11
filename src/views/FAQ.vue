<template>
<div>
  <section id="faq" class="faq">
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
            <prismic-items :prismicItems="content.header1"></prismic-items>
             <prismic-items :prismicItems="content.text1"></prismic-items>
              <prismic-items :prismicItems="content.header2"></prismic-items>
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
  name: 'faq',
  components: {
    PrismicItems
  },
  props: ['faq'],
  data () {
    return {
      response: null
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getFAQ']
      return content
    }
  }
}
</script>
<style scoped >
#about{
   min-width: 300px;
 min-height: 300px;
 padding: 20px;
 height: auto;
}
.h1{
text-align: left;
}
#b-button{
  color: aqua;
}
</style>
