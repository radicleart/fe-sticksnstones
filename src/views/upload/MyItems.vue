<template>
<div class="container" v-if="loaded">
  <div class="mb-5" :key="componentKey">
    <h1>Your NFTs</h1>
  <!-- <div v-else class="center text-center">
  <LoopbombSpinner />
  <div>Making daisy chains... back soon.</div>
</div> -->
    <!-- Items Section -->
    <div class="container" v-if="content" :key="componentKey">
    <div class="d-flex justify-content-center main-search">
    <search-bar :showPrepend="true" v-on="$listeners"/>
    </div>
    <b-nav tabs align="center">
      <b-nav-item class="ml-3" :variant="(filter === 'all') ? 'info' : 'light'" @click="updateFilter('all')">All</b-nav-item>
      <b-nav-item class="ml-3" :variant="(filter === 'uploaded') ? 'info' : 'light'" @click="updateFilter('uploaded')">Uploaded</b-nav-item>
      <b-nav-item class="ml-3" :variant="(filter === 'minted') ? 'info' : 'light'" @click="updateFilter('minted')">Minted</b-nav-item>
      <!-- <b-nav-item class="ml-3" :variant="(filter === 'onsale') ? 'info' : 'light'" @click="updateFilter('onsale')">On Sale</b-nav-item>
      <b-nav-item class="ml-3" :variant="(filter === 'sold') ? 'info' : 'light'" @click="updateFilter('sold')">Sold</b-nav-item> -->
    </b-nav>
    <b-row :key="componentKey" class="mb-4" v-if="filteredItems && filteredItems.length > 0">
      <b-col md="4" sm="4" xs="6" v-for="(item, index) in filteredItems" :key="index" class="mt-5">
        <SingleItem class="mb-2" :item="item"/>
      </b-col>
    </b-row>
      <result-grid :resultSet="resultSet" :gridClasses="gridClasses" v-if="resultSet && resultSet.length > 0"/>
      <div v-else>No results</div>
  </div>
  <div class="d-flex justify-content-center">
  <b-button variant="warning" class="mr-2 mb-2"><b-link class="text-white" to="/create">Upload New Item</b-link></b-button>
  </div>
</div>
</template>

<script>
import SingleItem from '@/components/upload/SingleItem'
import { APP_CONSTANTS } from '@/app-constants'
// import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'MyItems',
  components: {
    SingleItem
    // LoopbombSpinner
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
    this.$store.dispatch('rpaySearchStore/findBySearchTerm')
    this.$store.dispatch('rpayMyItemStore/fetchItems').then((items) => {
      // if (!this.filter) this.$router.push('/my-uploads')
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
    resultSet () {
      return this.$store.getters[APP_CONSTANTS.KEY_SEARCH_RESULTS]
    },
    filteredItems () {
      if (this.filter === 'all') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_ITEMS]
      } else if (this.filter === 'uploaded') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_UNMINTED_ITEMS]
      } else if (this.filter === 'minted') {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_MINTED_ITEMS]
      } else {
        return this.$store.getters[APP_CONSTANTS.KEY_MY_PURCHASED_ITEMS]
      }
    }
  }
}
</script>
