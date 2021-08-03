<template>
<div id="group-section" v-if="content">
  <div class="item" v-for="(item, index) in content.group1" :key="index">
    <div class="img">
    <img class="item__img" :src="item.img.url" :alt="item.img.alt">
    </div>
    <div class="words">
    <div class="item__title">{{ item.title[0].text }}</div>
    <div class="item__text">{{ item.text[0].text }}</div>
    <div class="item__text">{{ item.text[1].text }}</div>
    <div class="item__text">{{ item.text[2].text }}</div>
    <div class="item__text">{{ item.text[3].text }}</div>
    <div class="item__text">{{ item.text[4].text }}</div>
    <div class="item__text">{{ item.text[5].text }}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Group1',
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
.item {
  display: flex;
}
.img {
  width: 40vw;
}

</style>
