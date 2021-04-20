<template>
<div>
  <div class="row">
    <div class="col-2 text-white">
      <b-card title="3D Assets" tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text class="text-center">
          <b-icon style="width:100px; height:100px;" icon="bricks"/>
        </b-card-text>
        <b-card-text style="height: 100px;">
          Mint 3D assets and trade this on out marketplace.
        </b-card-text>
        <b-button @click="uploadContinue('threed')" class="w-100" href="#" variant="primary">Continue</b-button>
      </b-card>
    </div>
    <div class="col-2 text-white">
      <b-card title="Documents" tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text class="text-center">
          <b-icon style="width:100px; height:100px;" icon="file-earmark"/>
        </b-card-text>
        <b-card-text style="height: 100px;">
          Mint PDF files and provide general proofs of oownership.
        </b-card-text>
        <b-button @click="uploadContinue('text')" class="w-100" href="#" variant="primary">Continue</b-button>
      </b-card>
    </div>
    <div class="col-2 text-white">
      <b-card title="Music / Audio" tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text class="text-center">
          <b-icon style="width:100px; height:100px;" icon="file-earmark-music"/>
        </b-card-text>
        <b-card-text style="height: 100px;">
          Mint music or any audio file including podcasts, interviews etc.
        </b-card-text>
        <b-button @click="uploadContinue('audio')" class="w-100" href="#" variant="primary">Continue</b-button>
      </b-card>
    </div>
    <div class="col-2 text-white">
      <b-card title="Images" tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text class="text-center">
          <b-icon style="width:100px; height:100px;" icon="file-image"/>
        </b-card-text>
        <b-card-text style="height: 100px;">
          Mint any kind of image file.
        </b-card-text>
        <b-button @click="uploadContinue('image')" class="w-100" href="#" variant="primary">Continue</b-button>
      </b-card>
    </div>
    <div class="col-2 text-white">
      <b-card title="Video" tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text class="text-center">
          <b-icon style="width:100px; height:100px;" icon="camera-video"/>
        </b-card-text>
        <b-card-text style="height: 100px;">
          Mint video files. We accept mp4 ad other popular video file formats.
        </b-card-text>
        <b-button @click="uploadContinue('video')" class="w-100" href="#" variant="primary">Continue</b-button>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ChooseHandler',
  data: function () {
    return {
    }
  },
  methods: {
    uploadContinue (mediaTypesAllowed) {
      this.$router.push('/upload-item?mediaTypesAllowed=' + mediaTypesAllowed)
    }
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
