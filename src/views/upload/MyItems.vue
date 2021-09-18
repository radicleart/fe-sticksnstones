<template>
<div v-if="content" id="homepage">
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
    <div class="d-flex justify-content-center homepage__categories">
      <div :class="isActive('all')"><a href="#" @click.prevent="category = 'all'">All</a></div>
      <div :class="isActive('uploaded')"><a href="#" @click.prevent="category = 'uploaded'">Uploaded</a></div>
      <div :class="isActive('minted')"><a href="#" @click.prevent="category = 'minted'">Minted</a></div>
      <!-- <b-nav-item class="ml-3" :variant="(filter === 'onsale') ? 'info' : 'light'" @click="updateFilter('onsale')">On Sale</b-nav-item>
      <b-nav-item class="ml-3" :variant="(filter === 'sold') ? 'info' : 'light'" @click="updateFilter('sold')">Sold</b-nav-item> -->
    </div>
    <div class="homepage__items-section">
    <result-grid :resultSet="resultSet" :gridClasses="gridClasses" v-if="resultSet && resultSet.length > 0"/>
      <div v-else>No results</div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
  <b-button variant="warning" class="mr-2 mb-2"><b-link class="text-white" to="/create">Upload New Item</b-link></b-button>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
// import SingleItem from '@/components/upload/SingleItem'
import SearchBar from '@/components/items/SearchBar'
// import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'MyItems',
  components: {
    // SingleItem,
    SearchBar
    // LoopbombSpinner
  },
  data () {
    return {
      query: null,
      componentKey: 0,
      category: 'all',
      gridClasses: ['col-md-3', 'col-sm-4', 'col-6']
    }
  },
  mounted () {
    this.loading = false
    this.$store.dispatch('rpaySearchStore/findBySearchTerm')
  },
  methods: {
    isActive (category) {
      if (this.category === category) {
        return 'active'
      }
      return ''
    }
  },
  computed: {
    resultSet () {
      return this.$store.getters[APP_CONSTANTS.KEY_SEARCH_RESULTS]
    }
  }
}
</script>
<style lang="scss">
#homepage {

 /* MAIN SEARCH BAR */
  & .main-search {
    margin-top: -28.5px;
    z-index: 2;
  }
  & .main-search--border {
    width: 100%;
    max-width: 800px;
  }

 /* MAIN SEARCH BAR -- LOOP ICON */
  & .input-group-append svg {
    font-size: 20px;
    font-weight: bold;
    color: #50B1B5;
    margin-right: 22px;
    margin-left: 1px;
  }
}
</style>
