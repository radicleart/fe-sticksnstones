<template>
  <div class="home">
    <h1>Welcome to Sticks n Stones !</h1>
    <auth-component/>
  </div>
</template>

<script>
import AuthComponent from '../components/AuthComponent.vue'

export default {
  components: { AuthComponent }
}

</script>

<style scoped>

  .h1{
    color: black;
  }
</style>
