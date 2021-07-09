<template>
<section class="" id="section-upload">
  <b-container class="mt-5 pt-5" v-if="loaded">
    <div><WalletStates @evt-loaded="setLoaded"/></div>
    <div><Gallery @evt-loaded="setLoaded"/></div>
  </b-container>
  <b-container v-else class="center text-center">
    <LoopbombSpinner />
    <div>Making daisy chains... back soon.</div>
  </b-container>
</section>
</template>

<script>
import Gallery from '@/components/marketplace/Gallery'
import WalletStates from '@/components/toolkit/wallet-flow/WalletStates'
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'Home',
  components: {
    LoopbombSpinner,
    WalletStates,
    Gallery
  },
  data () {
    return {
      loaded: true
    }
  },
  methods: {
    setLoaded: function () {
      this.loaded = true
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" >
#upload-item .drop-zone {
  min-width: 300px;
  min-height: 300px;
  padding: 20px;
  height: auto;
  border-radius: 18px;
  border: 1pt dashed rgb(146, 146, 38);
  text-align: center;
}
#upload-item .badge {
  cursor: pointer;
  padding: 5px !important;
}
</style>
