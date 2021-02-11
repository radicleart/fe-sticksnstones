<template>
    <div class="MyItems">
        <h1>
            Welcome to my items !
        </h1>
        <button @click="getData">Get data</button>
        <div>{{ fileGet[0].name }}</div>
    </div>
</template>

<script>
const emptyFile = new File([], 'Emptyfile')

export default {
  data () {
    return {
      fileName: 'data2.txt',
      getOptions: {
        decrypt: true
      },
      fileGet: [emptyFile]
    }
  },
  methods: {
    getData () {
      console.log('Fonction lancée')
      // this.fileGet = getData(this.fileName, this.getOptions)
    }
  }
}
</script>
