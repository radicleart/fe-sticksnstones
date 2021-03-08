<template>
<div>
  <div class="mb-3" role="group text-right w-100">
    <label>Number of editions</label>
    <b-form-input
      id="item-editions"
      type="number"
      v-model="item.editions"
      :state="itemEditionsState"
      aria-describedby="item-editions-help item-editions-feedback"
      placeholder="Enter editions"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="item-editions-feedback">
      Editions maybe be required
    </b-form-invalid-feedback>
    <b-form-text id="item-keywords-help">How many editions in this print run shall we allow to be minted?</b-form-text>
  </div>
  <div class="my-4 text-right"><b-button class="" variant="danger" @click.prevent="$emit('upload-state', { change: 'up' })">Next</b-button></div>
</div>
</template>

<script>
export default {
  name: 'ItemFormPart1',
  props: ['item', 'formSubmitted'],
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
    itemEditionsState () {
      if (!this.formSubmitted && !this.item.editions) return null
      return (this.item.editions > 0)
    }
  }
}
</script>

<style scoped>
</style>
