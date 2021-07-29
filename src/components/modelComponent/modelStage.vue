<template>
<section>
  <canvas @wheel.prevent id="renderCanvas" touch-action="none" width="350px" height="350px"></canvas>
</section>
</template>

<script>
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import babylonUtils from '@/services/babylonUtils'

export default {
  name: 'modelStage',
  components: {
  },
  props: ['model', 'scale', 'position', 'modelName'],
  data () {
    return {
      canvas: null,
      mat: null,
      pinPosition: 'display: none; position: absolute; top: 50px; left: 50px;',
      engine: null,
      sceneObject: null,
      advancedTexture: null,
      button1: null,
      loadingLayerShowing: true,
      loadingLayerMessage: 'loading...',
      meshFullId: null,
      meshId: null,
      movingMessage: null,
      pinMessage: null,
      rootPath: this.model,
      frames: 0,
      loading: true,
      running: false,
      time: performance.now(),
      name: this.name
    }

    // this.sceneObject.scene > sceneObject.scene
  },
  watch: {
    model () {
      this.loadNewScene()
    }
  },
  mounted () {
    this.canvas = document.getElementById('renderCanvas')
    this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true })
    this.sceneObject = babylonUtils.createScene(this.canvas, this.engine, this.rootPath, this.name)
    this.sceneObject.camera.inputs.attached.pointers.angularSensibilityX = 200
    this.sceneObject.camera.inputs.attached.pointers.angularSensibilityY = 200
    this.sceneObject.camera.position = new BABYLON.Vector3(-0.5, 1.5, 20)
    this.sceneObject.camera.upperRadiusLimit = 25
    const $self = this
    babylonUtils.createDelayedScene(this.canvas, this.sceneObject.scene, this.rootPath, this.name).then((objects) => {
      this.$emit('evt-babylon-stage', { opcode: 'stage-loaded' })
      $self.objects = objects
      $self.loadingLayerMessage = 'ready:'
      $self.sceneObject.scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            break
          case BABYLON.KeyboardEventTypes.KEYUP:
            $self.handleEscape()
            break
        }
      })
      $self.renderNewScene()
    })
    window.addEventListener('resize', function () {
      $self.engine.resize()
    })
  },
  methods: {
    openInfoPanel (evt) {
      this.$emit('evt-babylon-stage', { opcode: 'asset-display', event: evt, meshId: this.meshId })
    },
    renderNewScene () {
      const $self = this
      this.engine.runRenderLoop(function () {
        if ($self.sceneObject.scene) {
          $self.sceneObject.scene.render()
        }
      })
    },
    loadNewScene () {
      this.sceneObject.scene = babylonUtils.createDelayedScene(this.canvas, this.sceneObject.scene, this.rootPath, this.name)
      this.renderNewScene()
    }
  }
}

</script>

<style>
#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
.bottom-nav {
  position: absolute;
  bottom: 20px;
  left: 10px;
  color: #fff;
  padding: 5px  10px;
  margin: 5px  10px;
  background: #ccc;
}
</style>
