<template>
  <div>
    {{currentModelName()}}
    <modelStage v-on="$listeners" :model="getCurrentModel()" :position="position"/>
  </div>
</template>

<script>
import modelStage from './modelStage'

export default {
  name: 'modelTheatre',
  components: {
    modelStage
  },
  data () {
    return {
      currentModel: null,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      gltfModels: [
        { name: 'stacks_w.gltf', scale: [0.5, 0.5, 0.5], rotation: [3.0, 0.0, 0.0] }
      ]
    }
  },
  methods: {
    changeModel (model) {
      this.currentModel = model
    },
    getCurrentModel () {
      if (!this.currentModel) return this.gltfModels[0]
      return this.currentModel
    },
    currentModelName () {
      if (!this.currentModel) return
      const index = this.currentModel.name.lastIndexOf('/') + 1
      const index1 = this.currentModel.name.lastIndexOf('.')
      return this.currentModel.name.substring(index, index1)
    }
  },
  computed: {
  }
}
</script>

<style>
#deep-logos li {
  cursor: pointer;
}
</style>
