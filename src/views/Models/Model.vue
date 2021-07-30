<template>
<b-container class="m0 p-0" fluid>
      <modelTheatre @evt-babylon-stage="evtBabylonStage"/>
</b-container>
</template>

<script>
const modelTheatre = () => import('@/components/modelComponent/modelTheatre')

export default {
  name: 'model',
  components: {
    modelTheatre
  },
  data () {
    return {
      showScene: 0,
      showRpay: false,
      metaData: null,
      stageLoaded: false
    }
  },
  watch: {
    stageLoaded () {
      if (this.stageLoaded) this.$bvModal.hide('stage-loading-display-modal')
    }
  },
  methods: {
    evtBabylonStage (data) {
      if (data.opcode === 'asset-display') {
        this.metaData = data
        this.$bvModal.show('asset-display-modal')
      } else if (data.opcode === 'stage-loaded') {
        this.$bvModal.hide('stage-loading-display-modal')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
