<template>
  <b-row>
    <b-col cols="4" v-for="(result, index) in resultSet" :key="index" v-show="isDisplayable(result)">
      <ResultItem v-on="$listeners" :result="result"/>
    </b-col>
  </b-row>
</template>

<script>
import ResultItem from './ResultItem'

export default {
  name: 'ResultGrid',
  components: {
    ResultItem
  },
  props: ['resultSet'],
  data () {
    return {
    }
  },
  methods: {
    isDisplayable (result) {
      return result.attributes && result.attributes.artworkFile && result.attributes.artworkFile.fileUrl
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
</style>
