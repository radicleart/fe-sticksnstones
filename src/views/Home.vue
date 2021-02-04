<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <auth-component/>
  </div>
</template>

<script>
import AuthComponent from '../components/AuthComponent.vue'

export default {
  components: { AuthComponent }
}

</script>
