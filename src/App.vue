<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
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
