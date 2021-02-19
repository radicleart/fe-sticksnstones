<template>
<div>
  <h1>
      Welcome to my items !
  </h1>
  <div v-if="!isLoggedIn">
    You have to be connected to see your items
  </div>
  <div class="row mb-4">
    <div v-for="(item, index) in myItems" :key="index" class="mt-5 col-md-3 col-sm-4 col-6">
      <single-item class="mb-2" :item="item"/>
    </div>
  </div>
</div>
</template>

<script>
import SingleItem from '@/components/SingleItem'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'MyItems',
  components: {
    SingleItem
  },
  data () {
    return {
    }
  },
  mounted () {
    this.loading = false
    this.$store.dispatch('myItemStore/fetchItems')
  },
  methods: {
  },
  computed: {
    myItems () {
      const myItems = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEMS]
      if (myItems) return myItems
      return []
    },
    isLoggedIn () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.loggedIn
    }
  }
}
</script>
