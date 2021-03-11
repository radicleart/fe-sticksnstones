<template>
<section id="deep-logos">
  <div class="row">
    <div class="col-10">
      <logo-risidio :model="currentModel" :scale="scale"/>
    </div>
    <div class="col-2">
      <ul>
        <li v-for="( model, index) in gltfModels" :key="index" @click="currentModel = rootPath + model.name">{{model.name}}</li>
      </ul>
    </div>
  </div>
</section>
</template>

<script>
import LogoRisidio from '@/components/scenes/LogoRisidio.vue'

export default {
  name: 'Donate',
  components: {
    LogoRisidio
  },
  data () {
    return {
      currentModel: 'https://test.risidio.com/gltf/3dLogos/test.glb',
      scale: [0.8, 0.8, 0.8],
      rootPath: 'https://test.risidio.com/gltf/3dLogos/',
      gltfModels: [
        { name: 'risidio/bicoinres.gltf' },
        { name: 'risidio/residio black.gltf' },
        { name: 'risidio/residio white.gltf' },
        { name: 'stack/bicoinres.gltf' },
        { name: 'stack + risidio/stacksblack+risidioblack.gltf' },
        { name: 'stack + risidio/stackswhite+risidiowhite.gltf' },
        { name: 'bitcoin/lendres.gltf' },
        { name: 'Bitcoin + risidio/bitcoin+residio black.gltf' },
        { name: 'Bitcoin + risidio/bitcoin+residio white.gltf' },
        { name: 'Bitcoin + risidio/bitcoin+residio.gltf' },
        { name: 'lightning/untitled.gltf' },
        { name: 'lightning + residio/bitcoinlightning+residio black.gltf' },
        { name: 'lightning + residio/bitcoinlightning+residio white.gltf' },
        { name: 'lightning + residio/lendres.gltf' },
        { name: 'swain logo/swain.gltf' },
        { name: 'swain+risidio/swain+risidioblack.gltf' },
        { name: 'swain+risidio/swain+risidiowhite.gltf' },
        { name: 'swain+risidio/swain+risidio.gltf' }
      ]
    }
  },
  methods: {
    changeModel (name) {
      this.currentModel = this.rootPath + name
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
