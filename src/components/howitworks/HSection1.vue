<template>
<div v-if="content">
  <div id="h-1"></div>
  <section id="how-1" class="how-section bg-white text-black">
    <b-container style="min-height: 25vh">
      <b-row align-h="center" style="min-height: 31vh">
        <b-col md="8" sm="10" align-self="center">
          <div class="text-left">
            <b-list-group>
              <b-list-group-item variant="success"><prismic-items :prismicItems="content.title1"></prismic-items></b-list-group-item>
              <b-list-group-item variant="info"><prismic-items :prismicItems="content.text1"></prismic-items></b-list-group-item>
            </b-list-group>
          </div>
          <!-- <div class="testing_group">
            <div class="item" v-for="(item, index) in content.group1" :key="index">
              <img class="item__img" :src="item.image.url" :alt="item.image.alt">
              <div class="item__title">{{ item.title[0].text }}</div>
              <div class="item__text">{{ item.text[0].text }}</div>
            </div> -->
          <!-- </div> -->
        </b-col>
      </b-row>
    </b-container>
  </section>
</div>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'

export default {
  name: 'HSection1',
  components: {
    PrismicItems
  },
  props: ['content'],
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
/* General style */
#h-1 {
  height: 90px;
  background-color: transparent;
  z-index: 10;
}

section {
  padding: 20px 0;
}
#how-1 p {
  text-align: left;
}
#how-1 img {
  text-align: center;
  width: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
}
#how-1 h4 {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 10px;
}
h1 {
  font-size: 3rem;
  color: #333333;
}
.section2-text {
  max-width: 600px;
  color: #888888;
  font-size: 1.5rem;
  margin: 0 auto;
}
</style>
