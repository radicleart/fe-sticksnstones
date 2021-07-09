<template>
<div class="container" v-if="loaded">
  <div class="mb-5" :key="componentKey">
    <div class="d-flex justify-content-end">
      <b-button class="ml-3" :variant="(filter === 'pending') ? 'info' : 'light'" @click="updateFilter('pending')">Pending</b-button>
      <b-button class="ml-3" :variant="(filter === 'minted') ? 'info' : 'light'" @click="updateFilter('minted')">Minted</b-button>
      <b-button class="ml-3" :variant="(filter === 'purchased') ? 'info' : 'light'" @click="updateFilter('purchased')">Purchased</b-button>
      <b-button class="ml-3" :variant="(filter === 'all') ? 'info' : 'light'" @click="updateFilter('all')">All</b-button>
    </div>
    <b-row :key="componentKey" class="mb-4" v-if="filteredItems && filteredItems.length > 0">
      <b-col md="4" sm="4" xs="6" v-for="(item, index) in filteredItems" :key="index" class="mt-5">
        <SingleItem class="mb-2" :item="item"/>
      </b-col>
    </b-row>
  </div>
</div>
<div v-else class="center text-center">
  <LoopbombSpinner />
  <div>Making daisy chains... back soon.</div>
</div>
</template>

<script>
import SingleItem from '@/components/items/SingleItem'
import { APP_CONSTANTS } from '@/app-constants'
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'MyItems',
  components: {
    SingleItem,
    LoopbombSpinner
  },
  data () {
    return {
      filter: 'pending',
      componentKey: 0,
      backupItems: null,
      loaded: false
    }
  },
  mounted () {
    this.filter = this.$route.params.filter
    this.$store.dispatch('myItemStore/fetchItems').then((items) => {
      // if (!this.filter) this.$router.push('/my-items/minted')
      this.backupItems = items
      this.loaded = true
    })
  },
  methods: {
    updateFilter (filter) {
      this.filter = filter
      if (filter !== this.$route.params.filter) {
        this.$router.push('/my-items/' + filter)
        this.componentKey++
      }
    }
  },
  computed: {
    filteredItems () {
      if (this.filter === 'all') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_ITEMS]
      } else if (this.filter === 'minted') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_MINTED_ITEMS]
      } else if (this.filter === 'pending') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_UNMINTED_ITEMS]
      } else {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_PURCHASED_ITEMS]
      }
    }
  }
}
</script>
