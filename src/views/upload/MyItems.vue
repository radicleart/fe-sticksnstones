<template>
<div class="container" v-if="loaded" id="items">
  <div class="mb-5" :key="componentKey">
    <h1>Your NFTs</h1>
      <div class="d-flex justify-content-center main-search">
      <search-bar :showPrepend="true" v-on="$listeners"/>
    </div>
    <b-nav tabs class="d-flex justify-content-center items__categories">
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
    <div v-else>No results</div>
  </div>
  <div class="d-flex justify-content-center items__categories--more-button">
  <b-button variant="warning" class="mr-2 mb-2"><b-link class="text-white" to="/create">Upload New Item</b-link></b-button>
  </div>
</div>
<div v-else class="center text-center">
  <LoopbombSpinner />
  <div>Making daisy chains... back soon.</div>
</div>
</template>

<script>
import SearchBar from '@/components/marketplace/SearchBar.vue'
import SingleItem from '@/components/upload/SingleItem'
import { APP_CONSTANTS } from '@/app-constants'
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'
export default {
  name: 'MyItems',
  components: {
    SingleItem,
    LoopbombSpinner,
    SearchBar
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
    this.$store.dispatch('rpayMyItemStore/fetchItems', true).then((items) => {
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
<style lang="scss">
#items {
  /* 1ST SECTION STYLE */
  & .mb-5 {
    height: 15vh;
  }
  & .mb-5 h1 {
    font-size: 7rem;
    margin-bottom: 24px;
  }
  /* MAIN SEARCH BAR */
  & .main-search {
    margin-top: 28.5px;
    z-index: 2;
  }
  & .main-search--border {
    width: 100%;
    max-width: 800px;
  }

  /* CATEGORIES BUTTONS */
  & .items__categories {
    border-bottom: 1px solid #E3E3E3;
    margin: 42px 0;
  }
  & .items__categories b-nav-item {
    font-size: 1.2rem;
    font-weight: 700;
    color: #50B1B5;
  }
  & .items__categories b-nav-item {
    margin: 0 20px;
  }
  & .items__categories div {
    padding-bottom: 14.5px;
  }
  & .items__categories--more-button {
    margin-top: 350px;
  }
}
</style>
