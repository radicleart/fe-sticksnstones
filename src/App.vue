<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/MyItems">My Items</router-link> |
      <router-link to="/Upload">Upload</router-link> |
      <auth-component/>
    </div>
    <router-view/>
  </div>
</template>

<script>

import AuthComponent from './components/AuthComponent.vue'

export default {
  components: { AuthComponent }
}
</script>
