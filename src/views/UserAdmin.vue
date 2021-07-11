<template>
<b-container class="my-5 p-4">
  <h1>Roles and Privileges</h1>
  <RolesAndPrivileges />
</b-container>
</template>

<script>
import RolesAndPrivileges from '@/components/admin/users/RolesAndPrivileges'
export default {
  name: 'UserAdmin',
  components: {
    RolesAndPrivileges
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('rpayPrivilegeStore/fetchAuthorisations').then((result) => {
      this.contractBalance = result.result
    })
  },
  methods: {
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
</style>
