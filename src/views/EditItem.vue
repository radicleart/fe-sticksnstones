<template>
    <div>
        <h1>Informations :</h1>
        <div> Name : {{ item.name }} <br>
          <div id="name">
            <input type=text v-model="itemNewValue.name">
            <button @click="changeData('name')">Change</button>
          </div>
        </div>
        <div>Description : {{ item.description }} <br>
          <div id="Description">
            <textarea rows="5" cols="50" v-model="itemNewValue.description"></textarea>
            <button @click="changeData('description')">Change</button>
          </div>
        </div>
        <div>Private : {{ item.private }}
          <div id="private">
            <input type="checkbox" v-model="item.private">
          </div>
        </div>
        <div>
          <button @click="submitChanges()">Submit</button>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      hash: null,
      item: {
        name: null,
        description: null,
        private: false
      },
      itemNewValue: {
        name: null,
        description: null
      },
      modified: false
    }
  },
  mounted () {
    this.hash = this.$route.params.hash
    this.$store.dispatch('myItemStore/findItemByAssetHash', this.hash).then((record) => {
      this.item = record
    })
  },
  methods: {
    changeData (Id) {
      this.item[Id] = this.itemNewValue[Id]
    },
    validate () {
      let result = true
      if (!this.item.name) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please enter the name of your artwork' })
        result = false
      }
      if (!this.item.description) {
        this.$notify({ type: 'error', title: 'Upload Item', text: 'Please enter a short description of your music' })
        result = false
      }
      return result
    },
    submitChanges () {
      if (this.validate()) {
        this.$store.dispatch('myItemStore/saveModifications', this.item).then(() => {
          this.$root.$emit('bv::show::modal', 'success-modal')
          this.$store.commit('setModalMessage', 'Your item has be updated.')
        })
      }
    }
  }
}
</script>
