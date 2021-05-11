<template>
  <b-button-group class="text-white" v-if="loaded">
    <b-button @click="$emit('clickButton')" class="btn-square text-white bg-dark">
      <span class="" v-if="icon">
        <b-icon class="text-warning" style="width: 30px; height: 30px;" :icon="icon"/>
      </span>
      <span class="" v-else>
        <img class="text-warning" style="width: 30px; height: 30px;" :src="svgImage"/>
      </span>
    </b-button>
    <b-button @click="$emit('clickButton')" class="btn-rectangle btn-dark">{{label1}}</b-button>
  </b-button-group>
</template>

<script>
export default {
  name: 'SquareButton',
  components: {
  },
  props: ['theme', 'usePixelBg', 'label1', 'icon', 'route', 'svgImage'],
  data () {
    return {
      pixelBg: require('@/assets/img/pixelBg.svg'),
      loaded: false,
      b1: null,
      bigButtonTheme: null
    }
  },
  mounted () {
    this.bigButtonTheme = 'btn-dark'
    if (this.theme) {
      this.bigButtonTheme = 'btn-' + this.theme
    }
    this.loaded = true
  },
  methods: {
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.btn-group > .btn {
  background: transparent;
  white-space: nowrap;
}
.btn-group > .btn:hover {
  background: transparent;
}
.btn-square {
  width: 61px;
  height: 61px;
  font-size: 2rem;
  border: 1pt solid #fff !important;
}
.btn-rectangle {
  min-width: 200px;
  font-size: 1.5rem;
  text-transform: uppercase;
  border: 1pt solid #ccc;
}
.btn-dark {
  color: #000;
  border: 1pt solid #ccc !important;
}
.btn-dark:hover {
  color: #000 !important;
  background: transparent !important;
  border: none;
}
.btn-light {
  color: #fff;
  border: 1pt solid #fff !important;
}
.btn-light:hover {
  color: #fff !important;
  background: transparent !important;
}
</style>
