<template>
<div>
      <section id="terms" class="terms">
                   <b-container fluid="lg" style="min-height: 10vh" class="pb-4 text-center">
      <b-row  align-h="center" style="min-height: 18vh">
                <b-col md="5" sm="10" align-self="center">
                  <router-link class="footer__link" to="/terms">Terms</router-link>
                           </b-col>
        <b-col md="5" sm="10" align-self="center">
          <router-link class="footer__link" to="/privacy">Privacy Policy</router-link>
               </b-col>
     </b-row>
   </b-container>
             <b-container style="min-height: 10vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 10vh">
        <b-col md="8" sm="10" align-self="center">
            <prismic-items :prismicItems="content.terms"></prismic-items>
             <prismic-items :prismicItems="content.text5"></prismic-items>
                </b-col>
     </b-row>
   </b-container>
           <b-container fluid="lg" style="min-height: 40vh" class="pb-4 text-right">
      <b-row  align-h="center" style="min-height: 18vh">
        <b-col md="5" sm="10" align-self="center">
      <prismic-items :prismicItems="content.tilte5"></prismic-items>
  <prismic-items :prismicItems="content.text3"></prismic-items>
     </b-col>
      <b-col sm="2"><b-img src="https://images.prismic.io/radsoc/9ad830e8-5fc3-4dd1-b43b-6a6737b27cb5_groups.png?auto=compress,format"></b-img></b-col>
     </b-row>
   </b-container>
          <b-container style="min-height: 60vh" class="pb-4 text-left">
      <b-row align-h="center">
               <b-img src="https://images.prismic.io/radsoc/9ad830e8-5fc3-4dd1-b43b-6a6737b27cb5_groups.png?auto=compress,format" ></b-img>
        <b-col md="5" sm="10" align-self="center">
      <prismic-items :prismicItems="content.title3"></prismic-items>
  <prismic-items :prismicItems="content.text3"></prismic-items>
     </b-col>
     </b-row>
   </b-container>
         <b-container style="min-height: 60vh" class="pb-4 text-left">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
    <prismic-items :prismicItems="content.header1"></prismic-items>
      <prismic-items :prismicItems="content.text2"></prismic-items>
    <prismic-items :prismicItems="content.header2"></prismic-items>
      <prismic-items :prismicItems="content.text2"></prismic-items>
          <prismic-items :prismicItems="content.header1"></prismic-items>
      <prismic-items :prismicItems="content.text2"></prismic-items>
    <prismic-items :prismicItems="content.header2"></prismic-items>
      <prismic-items :prismicItems="content.text2"></prismic-items>
       </b-col>
     </b-row>
   </b-container>
    </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
export default {
  name: 'Terms',
  components: {
    PrismicItems
  },
  props: ['Terms'],
  data () {
    return {
      response: null
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getTerms']
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
