<template>
<div>
  <section id="about" class="about">
    <b-container style="min-height: 60vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
          <div class="text-center">
          <h1><prismic-items :prismicItems="content.title1"></prismic-items></h1>
                    <prismic-items :prismicItems="content.text1"></prismic-items>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <section data-v-7ba5bd90="" id="getInTouchSection" class="d-flex align-items-center flex-column my-5" style="min-height: 100vh;">
      <div class="my-auto text-center text-white"><h2 class="text-white"></h2><div class="my-4"></div><div class="mb-3">
      </div><div class="mb-4 blurb"><span> <prismic-items :prismicItems="content.title2"></prismic-items><prismic-items :prismicItems="content.text2"></prismic-items>
      </span></div><div class="m-5 d-flex justify-content-center">
      <a title="join us on discord" href="https://discord.com/invite/sQaKVft" class="mr-4"><b-button variant="light">Button</b-button>
      </a>
       </div></div></section>
  </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
export default {
  name: 'about',
  components: {
    PrismicItems
  },
  props: ['about'],
  data () {
    return {
      response: null
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getAbout']
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
