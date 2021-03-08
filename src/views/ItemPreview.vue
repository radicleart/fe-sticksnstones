<template>
<div class="mt-3" v-if="!item">
  {{message}}
</div>
<div class="mt-3" v-else>
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <div id="result-item" class="mb-4">
        <div :style="bannerImage"></div>
      </div>
      <div class="ml-3">
        <div class="mb-2 text-bold">{{item.name}}</div>
        <div class="text-small">Uploaded by : {{item.uploader}}</div>
      </div>
    </div>
    <div class="col-md-6 col-sm-12">
      <div class="mb-2 text-bold">{{item.editions}} Editions</div>
      <span class="text-small" v-for="(kw, index) in item.keywords" :key="index">#{{kw.name}}</span>
      <div class="text-small">{{item.description}}</div>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'ItemPreview',
  data: function () {
    return {
      showHash: false,
      assetHash: null,
      message: null
    }
  },
  mounted () {
    this.loading = false
    this.assetHash = this.$route.params.assetHash
    this.$store.dispatch('myItemStore/findItemByAssetHash', this.assetHash).then((item) => {
      if (!item) {
        this.$router.push('/404')
      }
    })
  },
  methods: {
  },
  computed: {
    item () {
      return this.$store.getters['myItemStore/myItem'](this.assetHash)
    },
    keywords () {
      return this.$store.getters['myItemStore/myItem'](this.assetHash)
    },
    bannerImage () {
      const item = this.$store.getters['myItemStore/myItem'](this.assetHash)
      return this.$store.getters[APP_CONSTANTS.KEY_WAITING_IMAGE](item.imageUrl)
    }
  }
}
</script>

<style scoped>
</style>
