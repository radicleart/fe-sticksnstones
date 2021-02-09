<template>
    <div class="Upload page">
        <h1>
            Welcome to the upload page !
        </h1>
        <div v-if="!fileUploadedYet">
            <h2>Select a file to upload</h2>
            <input type="file" @change="onFileChange">
        </div>
        <div v-else>
            <div> This is the hash of your file : {{ fileHash }} </div>
            <button @click="removeFile">Remove File</button>
        </div>
    </div>
</template>

<script>

import sha256 from 'js-sha256'

export default {
  data () {
    return {
      fileUploadedYet: false,
      fileUploaded: '',
      fileHash: ''
    }
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createFile(files[0])
    },
    createFile (InputFile) {
      this.fileUploaded = InputFile
      this.fileUploadedYet = true
      this.displayHashFile()
    },
    displayHashFile () {
      this.fileUploaded.text().then(text => { this.fileHash = sha256(text) })
    },
    removeFile: function () {
      this.fileUploaded = ''
      this.fileUploadedYet = false
    }
  }
}
</script>
