<template>
    <div class="Upload page">
        <h1>
            Welcome to the upload page !
        </h1>
        <div v-if="!fileUploadedYet">
            <b-form-file
            v-model="fileUploaded"
            :state="fileUploadedYet"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @change="onFileChange"></b-form-file>
            <div v-if="fileUrl">Your file has been send at this url : {{ fileUrl }}.</div>
        </div>
        <div v-else>
            <div> This is the hash of your file : {{ fileHash }} </div>
            <button @click="removeFile">Remove File</button>
            <button @click="submitFile">Submit File</button>
        </div>
    </div>
</template>

<script>

import sha256 from 'js-sha256'
import { storeData } from '@/store/data_storage.js'

const emptyFile = new File([], 'Emptyfile')

export default {
  data () {
    return {
      fileUploadedYet: false,
      fileUploaded: emptyFile,
      fileHash: '',
      storageOptions: {
        encrypt: true
      },
      fileUrl: ''
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
    },
    submitFile () {
      this.fileUrl = Promise.resolve(storeData(this.fileUploaded.name, this.fileUploaded, this.storageOptions))
      this.removeFile()
    }
  }
}
</script>
