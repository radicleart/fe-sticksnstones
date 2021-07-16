<template>
<div v-if="loaded">
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
    <label for="domain-name">Domain</label>
    <b-form-input
      id="domain-name"
      v-model="domain"
      :state="domainState"
      aria-describedby="domain-help domains-feedback"
      placeholder="List of domain"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="domain-feedback">
      Enter the domain where these rules apply
    </b-form-invalid-feedback>
  </div>
  <div class="mb-3" role="group">
    <label for="privileges-name">Privileges, comma separated</label>
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
<div v-else>
  <LoopbombSpinner />
</div>
</template>

<script>
import LoopbombSpinner from '@/components/utils/LoopbombSpinner'

export default {
  name: 'AddPrivileges',
  components: {
    LoopbombSpinner
  },
  data () {
    return {
      formSubmitted: false,
      loaded: false,
      result: null,
      stxAddress: null,
      domain: null,
      privileges: null
    }
  },
  methods: {
    updateMedia: function () {
      this.$store.dispatch('rpayPrivilegeStore/addPrivilege', { stxAddress: this.stxAddress, domain: this.domain, privileges: this.privileges }).then((attributes) => {
        this.result = attributes
      })
    }
  },
  computed: {
    stxAddressState () {
      if (!this.formSubmitted && !this.stxAddress) return null
      return (this.stxAddress && this.stxAddress.length > 2)
    },
    domainState () {
      if (!this.formSubmitted && !this.domain) return null
      return (this.domain && this.domain.length > 2)
    },
    privilegesState () {
      if (!this.formSubmitted && !this.privileges) return null
      return (this.privileges && this.privileges.length > 2)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
