<template>
    <div class="AuthComponent">
      <div v-if="!isConnected">
        <button @click="authenticate">Not Log in</button>
      </div>
      <div v-else>
        You are connected as {{ userData }}
      </div>
    </div>
</template>

<script>

export default {
  name: 'AuthComponent',
  data () {
    return {
    }
  },
  methods: {
  }

}
</script>
