<template>
<section id="homeSection">
  <div class="container home-content">
    <div class="row">
      <div class="col-md-6 col-sm-12 text-white">
        <h1>Please login to continue</h1>
      </div>
    </div>
  </div>
</section>
</template>

<script>

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.startLoginNew()
  },
  methods: {
    startLoginNew () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        this.$emit('connect-login', myProfile)
      } else {
        this.$store.dispatch('rpayAuthStore/startLogin').then(() => {
          this.$router.push(this.$route.query.redirect)
        })
      }
    }
  },
  computed: {
  }
}
</script>

<style>
</style>
