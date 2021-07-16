<template>
<div v-if="loaded">
  <div class="mb-3" role="group">
    <h2>Roles and Privileges</h2>
    <b-tabs left content-class="mt-3 text-small">
      <b-tab title="Add Privileges" active>
        <AddPrivileges/>
      </b-tab>
    </b-tabs>
  </div>
</div>
<div v-else>
  <LoopbombSpinner />
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import AddPrivileges from '@/components/admin/users/AddPrivileges'
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'RolesAndPrivileges',
  components: {
    AddPrivileges,
    LoopbombSpinner
  },
  data () {
    return {
      formSubmitted: false,
      loaded: false,
      result: null
    }
  },
  mounted () {
    const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
    this.$store.dispatch('rpayPrivilegeStore/fetchPrivilegesForUser', { stxAddress: profile.stxAddress }).then((result) => {
      this.result = result
      this.loaded = true
    })
  },
  methods: {
  },
  computed: {
    stxAddressState () {
      if (!this.formSubmitted && !this.stxAddressState) return null
      return (this.stxAddressState && this.stxAddressState.length > 2)
    },
    domainsState () {
      if (!this.formSubmitted && !this.domainsState) return null
      return (this.domainsState && this.domainsState.length > 2)
    },
    privilegesState () {
      if (!this.formSubmitted && !this.privilegesState) return null
      return (this.privilegesState && this.privilegesState.length > 2)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
