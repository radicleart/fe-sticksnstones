<template>
<div>
  <div class="mb-3" role="group">
    <label for="stxAddress">STX Address :</label>
    <b-form-input
      id="stxAddress"
      v-model="stxAddress"
      :state="stxAddressState"
      aria-describedby="stxAddress-help stxAddress-feedback"
      placeholder="Enter users stx address"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="stxAddress-feedback">
      Valid STX Address
    </b-form-invalid-feedback>
  </div>
  <div class="mb-3" role="group">
    <label for="item-name">Domains</label>
    <b-form-input
      id="artist-name"
      v-model="domains"
      :state="domainsState"
      aria-describedby="domains-help domains-feedback"
      placeholder="List of domains"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="domains-feedback">
      Enter the domains where these rules apply
    </b-form-invalid-feedback>
  </div>
  <div class="mb-3" role="group">
    <label for="privileges-name">Privileges</label>
    <b-form-input
      id="privileges-name"
      v-model="privileges"
      :state="privilegesState"
      aria-describedby="privileges-help privileges-feedback"
      placeholder="List of privileges"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="privileges-feedback">
      Enter the privileges this user can enact
    </b-form-invalid-feedback>
  </div>
</div>
</template>

<script>

export default {
  name: 'RolesAndPrivileges',
  components: {
  },
  data () {
    return {
      formSubmitted: false
    }
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
