<template>
<div id="g3" v-if="content">
  <div class="item" v-for="(item, index) in content.group3" :key="index">
    <div class="img">
    <img class="item__img" :src="item.img.url" :alt="item.img.alt">
    </div>
    <div class="words">
    <h1 class="item__title">{{ item.title[0].text }}</h1>
      <ol class="item__text">{{ item.text[0].text }}</ol>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Group3',
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
#g3 {
  height: 60rem;
  width: 100rem;
  padding: 5%;
  margin-left: 5%;
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
