<template>
<div>
    <section id="privacy_policy" class="privacy_policy">
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
  name: 'privacy',
  components: {
    PrismicItems
  },
  props: ['privacy'],
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
      const content = this.$store.getters['contentStore/getPrivacy']
      return content
    }
  }
}
</script>
<style scoped >
#privacy_policy{
 min-width: 300px;
 min-height: 300px;
 padding: 20px;
 height: auto;
}
.h1{
text-align: left;
}
</style>
