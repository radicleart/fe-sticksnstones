<template>
    <div class="row mb-4">
        <div v-for="(item, index) in publicItems" :key="index" class="mt-5 col-md-3 col-sm-4 col-6">
            <single-item class="mb-2" :item="item"/>
        </div>
    </div>
</template>

<script>
import SingleItem from '@/components/SingleItem'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'PublicItems',
  components: {
    SingleItem
  },
  data () {
    return {
    }
  },
  mounted () {
    this.loading = false
    this.$store.dispatch('publicItemsStore/fetchPublicItems')
  },
  methods: {
  },
  computed: {
    publicItems () {
      const publicItems = this.$store.getters[APP_CONSTANTS.KEY_PUBLIC_ITEMS]
      if (publicItems) return publicItems
      return []
    }
  }
}
</script>
