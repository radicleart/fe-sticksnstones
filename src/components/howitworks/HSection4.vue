<template>
<div id="g4" v-if="content">
  <div class="item" v-for="(item, index) in content.group4" :key="index">
    <div class="words">
    <h1 class="item__title">{{ item.title[0].text }}</h1>
    <ol>
      <li class="item__text">{{ item.text[0].text }}</li>
      <li class="item__text">{{ item.text[1].text }}</li>
      <li class="item__text">{{ item.text[2].text }}</li>
      <li class="item__text">{{ item.text[3].text }}</li>
      <li class="item__text">{{ item.text[4].text }}</li>
      <li class="item__text">{{ item.text[5].text }}</li>
    </ol>
    </div>
    <div class="img">
    <img class="item__img" :src="item.img.url" :alt="item.img.alt">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Group4',
  components: {

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
#g4 {
  height: 60rem;
  width: 100rem;
  padding: 5%;
  margin-left: 10%;
}
.item {
  display: flex;
  flex-direction: row;
}
.img {
  padding: 5%;
}
.item__title{
  padding: 2%;
}

</style>
