<template>
<section id="deep-logos">
  <div class="row">
    <div class="col-6">
      <logo-risidio :model="model" :scale="scale"/>
    </div>
    <div class="col-6">
      <ul>
        <li @click="model = model1">Risidio logo</li>
        <li @click="model = model2">Stacks logo</li>
        <li @click="model = model3">StackRisidio logo</li>
        <li @click="model = model4">Bitcoin logo</li>
        <li @click="model = model5">BitcoinRisidio logo</li>
        <li @click="model = model6">Lightning logo</li>
        <li @click="model = model7">LightningRisidio logo</li>
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
      scale: [0.8, 0.8, 0.8],
      model: 'https://test.risidio.com/gltf/3dLogos/Risidio/bicoinres.gltf',
      model1: 'https://test.risidio.com/gltf/3dLogos/Risidio/bicoinres.gltf',
      model2: 'https://test.risidio.com/gltf/3dLogos/Stack/bicoinres.gltf',
      model3: 'https://test.risidio.com/gltf/3dLogos/StackRisidio/bicoinres.gltf',
      model4: 'https://test.risidio.com/gltf/3dLogos/Bitcoin/lendres.gltf',
      model5: 'https://test.risidio.com/gltf/3dLogos/BitcoinRisidio/bicoinres.gltf',
      model6: 'https://test.risidio.com/gltf/3dLogos/Lightning/untitled.gltf',
      model7: 'https://test.risidio.com/gltf/3dLogos/LightningRisidio/lendres.gltf'
    }
  },
  methods: {
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
