<template>
<div id="group-section" v-if="content">
  <div class="item" v-for="(item, index) in content.group1" :key="index">
    <img class="item__img" :src="item.img.url" :alt="item.img.alt">
    <div class="item__title">{{ item.title[0].text }}</div>
    <div class="item__text">{{ item.text[0].text }}</div>
    <div class="item__text">{{ item.text[1].text }}</div>
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
