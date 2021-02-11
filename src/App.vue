<template>
  <div id="app">
    <router-view name="header"/>
    <router-view class="container mt-5"/>
    <notifications :duration="10000" classes="r-notifs" position="bottom right" width="30%"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    scrollMeTo (data) {
      const element = document.getElementById(data.refName)
      const top = element.offsetTop
      window.scrollTo(0, top)
    }
  }
}
</script>
