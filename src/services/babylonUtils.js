import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

const setupSkyBox = function (scene) {
  const sky = 'https://res.cloudinary.com/mijo-enterprises/raw/upload/v1627051689/ruma/rainbowblur.pic'
  const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 50.0 }, scene)
  const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
  skyboxMaterial.backFaceCulling = false
  skyboxMaterial.reflectionTexture = new BABYLON.HDRCubeTexture(sky, scene, 1, false, true, false, true)
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
  skybox.material = skyboxMaterial
}

// const setupGround = function (scene) {
//   const ground = BABYLON.Mesh.CreateGround('ground', 1000, 1000, 4, scene)
//   const material = new BABYLON.StandardMaterial(scene)
//   material.alpha = 1
//   material.diffuseColor = new BABYLON.Color3(1, 1, 1)
//   ground.material = material
//   ground.position.y = 0
// }

const babylonUtils = {
  createScene: function (canvas, engine) {
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 20, BABYLON.Vector3.Zero(0, 0, 0), scene)
    camera.attachControl(canvas, true)
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.inertia = 0.2
    camera.upperBetaLimit = 1.5
    camera.lowerRadiusLimit = 5
    camera.upperRadiusLimit = 100
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
    light.intensity = 1
    return { scene: scene, light: light, camera: camera }
  },
  createDelayedScene: function (canvas, scene, rootPath, modelName) {
    return new Promise(function (resolve) {
      BABYLON.SceneLoader.ImportMesh(
        undefined,
        rootPath,
        modelName,
        scene,
        function (meshes, particleSystems, skeletons, animationList) {
          scene.createDefaultCameraOrLight(true)
          scene.activeCamera.attachControl(canvas, false)
          setupSkyBox(scene)
          resolve({ meshes: meshes, particleSystems: particleSystems, skeletons: skeletons, animationList: animationList })
        }
      )
      return scene
    })
  },
  getClientRectFromMesh: function (canvas, scene, mesh) {
    // get bounding box of the mesh
    const meshVectors = mesh.getBoundingInfo().boundingBox.vectors

    // get the matrix and viewport needed to project the vectors onto the screen
    const worldMatrix = mesh.getWorldMatrix()
    const transformMatrix = scene.getTransformMatrix()
    const viewport = scene.activeCamera.viewport

    // loop though all the vectors and project them against the current camera viewport to get a set of coordinates
    const coordinates = meshVectors.map(v => {
      const proj = BABYLON.Vector3.Project(v, worldMatrix, transformMatrix, viewport)
      proj.x = proj.x * canvas.clientWidth
      proj.y = proj.y * canvas.clientHeight
      return proj
    })

    const maxX = coordinates.reduce(function (prev, curr) {
      const newX = (prev.x) ? prev.x : prev
      return newX > curr.x ? newX : curr.x
    })
    const maxY = coordinates.reduce(function (prev, curr) {
      const newY = (prev.y) ? prev.y : prev
      return newY < curr.y ? newY : curr.y
    })

    return { maxX: maxX, maxY: maxY }
  },
  guiAddButtonToMesh ($emit, pickedMesh) {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    const name = pickedMesh.name.split('_')[0]
    const button1 = GUI.Button.CreateSimpleButton('but1', 'Open details for\n' + name)
    button1.width = '250px'
    button1.height = '80px'
    button1.color = 'white'
    button1.cornerRadius = 20
    button1.background = 'orange'
    button1.onPointerUpObservable.add(function (evt) {
      advancedTexture.removeControl(button1)
      $emit('evt-babylon-stage', { opcode: 'asset-display', event: evt, meshId: pickedMesh })
    })
    advancedTexture.addControl(button1)
  },
  animateCamera: function (camera, newTarget, scene) {
    const alpha = camera.alpha
    const beta = camera.beta
    const radius = camera.radius
    const target = camera.getTarget().clone()
    camera.focusOn([newTarget], true)
    camera.rebuildAnglesAndRadius()
    const animCamAlpha = new BABYLON.Animation('animCam', 'alpha', 30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
    const keysAlpha = []
    keysAlpha.push({
      frame: 0,
      value: alpha
    })
    keysAlpha.push({
      frame: 100,
      value: camera.alpha
    })
    const animCamBeta = new BABYLON.Animation('animCam', 'beta', 30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

    const keysBeta = []
    keysBeta.push({
      frame: 0,
      value: beta
    })
    keysBeta.push({
      frame: 100,
      value: camera.beta
    })
    const animCamRadius = new BABYLON.Animation('animCam', 'radius', 30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
    const keysRadius = []
    keysRadius.push({
      frame: 0,
      value: radius
    })
    keysRadius.push({
      frame: 100,
      value: camera.radius
    })

    const animCamTarget = new BABYLON.Animation('animTarget', '_target', 30,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

    const keysTarget = []
    keysTarget.push({
      frame: 0,
      value: target
    })
    keysTarget.push({
      frame: 100,
      value: camera.target.clone()
    })
    animCamAlpha.setKeys(keysAlpha)
    animCamBeta.setKeys(keysBeta)
    animCamRadius.setKeys(keysRadius)
    animCamTarget.setKeys(keysTarget)

    camera.animations.push(animCamAlpha)
    camera.animations.push(animCamBeta)
    camera.animations.push(animCamRadius)
    camera.animations.push(animCamTarget)

    camera.alpha = alpha
    camera.beta = beta
    camera.radius = radius
    camera.target.copyFrom(target)

    scene.beginAnimation(camera, 0, 100, false, 2, function () {
      console.log('done')
    })
  }
}
export default babylonUtils
