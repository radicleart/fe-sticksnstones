<template>
<section class="" id="section-upload">
  <b-container class="mt-5 pt-5">
    <b-row style="min-height: 40vh" v-if="nftState === 1">
      You need to download the we b wallet to get going!
    </b-row>
    <b-row style="min-height: 40vh" v-if="nftState === 2">
      Please login to get started!
    </b-row>
  </b-container>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      nftState: 0
    }
  },
  mounted () {
    const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
    if (profile.loggedIn) {
      this.$router.push('/create')
    } else {
      this.nftState = 1
    }
  },
  methods: {
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
