<template>
<div>
  <section id="developers" class="developers">
     <b-container style="min-height: 18vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 18vh">
        <b-col md="8" sm="10" align-self="center">
        <prismic-items :prismicItems="content.title"></prismic-items>
       </b-col>
     </b-row>
   </b-container>
      <b-container style="min-height: 60vh" class="pb-4 text-left">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
            <prismic-items :prismicItems="content.text"></prismic-items>
        </b-col>
     </b-row>
   </b-container>
  </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
export default {
  name: 'developers',
  components: {
    PrismicItems
  },
  props: ['developers'],
  data () {
    return {
      response: null
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
