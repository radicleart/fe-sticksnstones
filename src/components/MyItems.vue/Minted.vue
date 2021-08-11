<template>
<div>
  <section id="minted" class="minted">
     <b-container style="min-height: 18vh" class="pb-4 text-center">
      <b-row align-h="left" style="min-height: 18vh">
        <b-col md="8" sm="10" align-self="center">
      <prismic-items :prismicItems="content.title1"></prismic-items>
        </b-col>
     </b-row>
   </b-container>
     <b-container style="min-height: 18vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 18vh">
        <b-col md="8" sm="10" align-self="center">
         <prismic-items :prismicItems="content.title2"></prismic-items>
            <div class="container">
            <div class="justify-content-center main-search">
            <div class="text-center no-wrap main-search--border">
            <div  class="input-group"><div class="input-group-prepend">
            <div class="dropdown b-dropdown show btn-group" id="__BVID__66">
            </div></div><input
            type="text" placeholder="Looking for something in particular?"
            class="text-13-300 mr-sm-2 form-control form-control-sm " ><div class="input-group-append">
            <a href="#"><svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img"
            aria-label="search"  class="bi-search b-icon bi">
            <g><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
            </path></g></svg>
            </a>
            </div>
            </div>
            </div>
            </div>
            <div class="d-flex justify-content-center ">
              <div class="active">
                <b-button class="ml-3" :variant="'all'" @click="updateFilter('All')">All</b-button>
                </div>
              <div class="active">
                <b-button class="ml-3" :variant="'minted'" @click="updateFilter('Minted')">Minted</b-button>
              </div>
              <div class="active">
       <b-button class="ml-3" :variant=" 'on sale'" @click="updateFilter('On sale')">On sale</b-button>
            </div>
            <div class="active">
              <b-button class="ml-3" :variant="'Sold'" @click="updateFilter('Sold')">Sold</b-button></div>
              <div class="">
          <b-button class="ml-3" :variant="'Uploaded'" @click="updateFilter('Uploaded')">Uploaded</b-button>
            </div>
            </div>
            <div class="active">
            <div>No results</div>
            </div>
            </div>
        </b-col>
     </b-row>
   </b-container>
  </section>
</div>
</template>
<script>
import PrismicItems from '@/components/prismic/PrismicItems'
export default {
  name: 'minted',
  components: {
    PrismicItems
  },
  props: ['minted'],
  data () {
    return {
      response: null
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getMinted']
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
