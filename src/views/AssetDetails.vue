<template>
<div>
  <div v-if="gaiaAsset">
    <asset-details-section :gaiaAsset="gaiaAsset" />
  </div>
</div>
</template>

<script>
import AssetDetailsSection from '@/components/asset-details/AssetDetailsSection'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'AssetDetails',
  components: {
    AssetDetailsSection
  },
  data: function () {
    return {
    }
  },
  mounted () {
    if (this.$route.name === 'asset-by-index') {
      this.$store.dispatch('rpayStacksContractStore/fetchAssetByNftIndex', this.$route.params.nftIndex)
      this.$store.dispatch('assetGeneralStore/cacheUpdate', { nftIndex: this.$route.params.nftIndex })
    } else {
      this.$store.dispatch('rpayStacksContractStore/fetchAssetByHash', this.$route.params.assetHash)
      this.$store.dispatch('assetGeneralStore/cacheUpdate', { assetHash: this.$route.params.assetHash })
    }
  },
  methods: {
  },
  computed: {
    gaiaAsset () {
      if (this.$route.name === 'asset-by-index') {
        return this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_NFT_INDEX](Number(this.$route.params.nftIndex))
      } else {
        return this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSET_BY_HASH](this.$route.params.assetHash)
      }
    }
  }
}
</script>

<style scoped>
</style>
