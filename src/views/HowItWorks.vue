<template>
  <section id="section1" class="container-fluid home-content p-0" v-if="slices">
    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0">
        <h1 class="home-content text-white title">{{title}}</h1>
        <slices-block :rootId="'slice-'" :slices="slices" :columns="columns" class="container-fluid m-0 p-0"/>
      </div>
    </div>
  </section>
</template>

<script>
import SlicesBlock from '@/components/prismic/SlicesBlock.vue'

export default {
  name: 'HowItWorks',
  components: {
    SlicesBlock
  },
  data () {
    return {
      columns: [2, 2, -1, 1, 1]
    }
  },
  computed: {
    slices () {
      const content = this.$store.getters['contentStore/getHowItWorks']
      return (content) ? content.body : null
    },
    title () {
      const content = this.$store.getters['contentStore/getHowItWorks']
      return (content) ? content.title[0].text : null
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/custom.scss";
div {
  max-width: 100%;
}
.title {
  font-weight: bold;
  margin-left: 10%;
  font-size: 400%;
  margin-bottom: 0;
}
.my-header {
  position: absolute;
  top: 15vh;
  left: 10vw;
}
.protectButton{
  border-radius: 16px;
  align-content: center;
  background-color: #FF0752;
  text-align: center;
  color: white;
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
}
.home-content {
  position: relative;
  top: 40px;
}
#slice-0 {
  margin-top: 100vh;
  background-color: #fff;
  padding: 0 4%;
  background-image: url('../assets/img/Groupe 16193.png');
  background-repeat: no-repeat;
}
#slice-0 h1 {
  margin-bottom: 60px;
  font-size: 1.8rem;
  font-weight: bold;
}
#slice-0 h2 {
  margin-left: 45px;
  font-size: 1.4rem;
  margin-bottom: 20px;
}
#slice-0 p {
  margin-left: 30px;
  padding-bottom: 5%;
}

#slice-1 {
  position: relative;
  top: 200px;
  left: 100px;
  background-color: #fff;
  padding: 60px 40px;
  max-width: 40%;
  box-shadow: 10px 10px 30px #E0585869;
  max-height: 700px;
}
#slice-1 h1 {
  margin-bottom: 30px;
  font-size: 2.4rem;
  font-weight: bold;
}

#slice-2 {
  background-color: $danger;
  color: #fff;
  padding: 50px;
  z-index: 2;
  margin: 50px 0px;
  text-align: center;
}
#slice-2 h1 {
  margin-bottom: 30px;
  font-size: 2.4rem;
  font-weight: bold;
}

#slice-3 {
  margin: 50px 0;
  text-align: center;
}
.card {
  border-color: #FC14552E;
  box-shadow: 10px 10px 30px #FC14552E;
  border-radius: 16px;
  width: auto;
}
#slice-4 {
  text-align: center;
  background-color: $danger;
  color: #fff;
  padding: 50px;
  z-index: 2;
  margin: 50px 0px;
}
#slice-5 {
  text-align: center;
  padding: 50px 300px;
  width: 60%;
  margin: 50px 0px;
}
#slice-5 p {
  padding: 50px;
}

.container-fluid {
  margin: 0;
}
</style>
