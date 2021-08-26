<template>
<div>
  <section id="faq" class="faq">
          <div><input type="text" v-model="search" placeholder="search blogs" class="search"></div>
<div v-for="post in filteredPosts" :key="post.id">
<post :post="post"></post>
<br>
     <b-container style="min-height: 18vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 18vh">
        <b-col class="faq1" md="12" sm="10" align-self="center">
        <prismic-items :prismicItems="content.title1"></prismic-items>
       </b-col>
     </b-row>
   </b-container>
      <b-container style="min-height: 60vh" class="pb-4 text-left">
      <b-row align-h="center" style="min-height: 91vh">
        <b-col md="8" sm="10" align-self="center">
            <prismic-items :prismicItems="content.header1" ></prismic-items>
         <prismic-items :prismicItems="content.text1" ></prismic-items>
              <prismic-items :prismicItems="content.header2"></prismic-items>
        <prismic-items :prismicItems="content.text1"></prismic-items>
        </b-col>
     </b-row>
   </b-container>
   </div>
  </section></div>
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
      response: null,
      search: '',
      posts: [
        {
          id: 'title1',
          title: '',
          body: 'lorem ipsum'
        }
      ]
    }
  },
  computed: {
    content () {
      const content = this.$store.getters['contentStore/getFAQ']
      return content
    },
    filteredPosts: function () {
      return this.posts.filter(post => post.body.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
}
</script>
<style scoped >
#faq{
   min-width: 300px;
 min-height: 300px;
 padding: 20px;
 height: auto;
}
.prismicItems .h1.prismicItems{
  text-align: center;
  font-size: 10px;
}
.h1{
text-align: left;
}
#b-button{
  color: aqua;
}
.search {
    line-height: 30px;
    padding: 10px 45px;
    border-radius: 100px;
    border: 1px solid #ccc;
    font-size: 16px;
     float: right;
    display: block;
    width: 50%;
    margin-right: 30px;
    }
    .header1{
      font-size: 70px;
    }
</style>
