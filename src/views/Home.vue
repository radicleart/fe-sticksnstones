<template>
  <div class="home">
    <h1>Welcome to Sticks n Stones !</h1>
    <public-items/>
  </div>
</template>

<script>

import publicItems from '@/components/Home/publicItems'

export default {
  components: {
    publicItems
  }
}
</script>

<style scoped>

  .h1{
    color: black;
  }
</style>
