<template>
<b-container class="my-5 p-4">
  <h1 class="mb-5">Application Administration</h1>
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
  methods: {
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
</style>
