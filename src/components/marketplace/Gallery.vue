<template>
<b-container v-if="loaded">
  <div class="mb-5">
    <ResultGrid id="grid-container" class="container text-center" :resultSet="resultSet"/>
  </div>
</b-container>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import ResultGrid from '@/components/marketplace/ResultGrid'

export default {
  name: 'Gallery',
  components: {
    ResultGrid
  },
  data () {
    return {
      resultSet: [],
      loaded: false
    }
  },
  mounted () {
    const ca = this.$store.getters[APP_CONSTANTS.KEY_CONTRACT_ADDRESS]
    const cn = this.$store.getters[APP_CONSTANTS.KEY_CONTRACT_NAME].split('-')
    const data = {
      inField: 'projectId',
      // eslint-disable-next-line no-useless-escape
      query: 'projectId:' + ca + '.' + cn[0] + '*'
    }
    this.$store.dispatch('rpaySearchStore/findByGeneralSearchTerm', data).then((results) => {
      this.results = results
      this.fetchContractAssets(results)
      this.loaded = true
      this.$emit('evt-loaded')
    })
    // this.$store.dispatch('rpaySearchStore/findByProjectId', this.$store.getters[APP_CONSTANTS.KEY_CONTRACT_ID]).then((results) => {
  },
  methods: {
    fetchContractAssets (results) {
      const newAssets = []
      if (results && results.length > 0) {
        results.forEach((ga) => {
          const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](ga.assetHash)
          ga.contractAsset = contractAsset
          newAssets.push(ga)
        })
      }
      this.resultSet = newAssets
      this.loaded = true
    }
  },
  computed: {
  }
}
</script>
