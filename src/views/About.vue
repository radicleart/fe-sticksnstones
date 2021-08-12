<template>
<div>
  <section id="about" class="about">
    <b-container style="min-height: 60vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
          <div class="text-center">
                <b-img src="https://images.prismic.io/radsoc/26f1e22e-5565-4f32-8761-e1b69a3d8e50_risisdilogo.png?auto=compress,format"></b-img>
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
      <a class="mr-4"><b-button variant="light">Read More</b-button>
      </a>
       </div></div></section>
       <div class="text-center">
               <b-img src="https://images.prismic.io/radsoc/9ad830e8-5fc3-4dd1-b43b-6a6737b27cb5_groups.png?auto=compress,format"></b-img>
               <prismic-items :prismicItems="content.title3"></prismic-items>
               <prismic-items :prismicItems="content.text3"></prismic-items>
</div>
<div class="container1">
    <b-container style= "align-self=center; text-align: center" fluid class="p-4 bg-light align-self=center;">
       <p align-self="center" style= "  padding-top: 130px;  font-size: 60px; color: black;">Meet the team</p>
  <b-row align-h="center" style="min-height: 91vh">
 <b-col align-self="center">
 <b-img src="https://images.prismic.io/radsoc/5b53f28e-8589-4e38-815d-d669ea0ac9e0_0642604bc88897185fc0eb0801195add.png?auto=compress,format" rounded="circle" alt="Circle image"></b-img>
 <p style= "text-align: center;font-size: 40px; color: black;">Name</p>
    </b-col>
    <b-col align-self="center">
 <b-img src="https://images.prismic.io/radsoc/a8ca440e-ddc3-4f0c-bdaf-ac8419cc613b_dce86d1c33b7a83d9181ed023758d35c.png?auto=compress,format"  rounded="circle" alt="Circle image"></b-img>
  <p style= "font-size: 40px; color: black;">Name</p>
    </b-col>
    <b-col align-self="center">
       <b-img src="https://images.prismic.io/radsoc/5b53f28e-8589-4e38-815d-d669ea0ac9e0_0642604bc88897185fc0eb0801195add.png?auto=compress,format" rounded="circle" alt="Circle image"></b-img>
        <p style= "font-size: 40px; color:black;">Name</p>
    </b-col>
  </b-row>
</b-container>
</div>
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
 height: 100%;
  width: 100%;
}
.h1{
text-align: left;
}
.container1 {
  width: 100%;
}
.container1 img {
  width: auto;
  height: auto;
}
</style>
