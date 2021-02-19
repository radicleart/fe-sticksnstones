<template>
<div class="mt-3">
<router-link :to="assetUrl">
  <div id="result-item" class="mb-4">
    <div v-if="item.imageUrl">
      <img style="max-width: 300px;" width="100%" :src="item.imageUrl"/>
    </div>
    <div v-else-if="item.logo">
      <img style="max-width: 300px;" width="100%" :src="item.logo"/>
    </div>
    <!-- <div style="position: absolute; top: -20px; left: 15px; font-size: 2rem;"><b-badge variant="light">{{result.nftIndex}} <span class="sr-only">NFT</span></b-badge></div> -->
    <div><a style="position: absolute; top: 0px; right: 0; font-size: 2rem; z-index: 10;" @click.prevent="toggleFavourite()" href="#"><img ref="lndQrcode" :src="likeIconPurple" alt="like-icon"></a></div>
    <!--<div class="result__item--description" v-if="dHover[index]" v-html="item.b1_text1[0].text"></div>-->
    <div class="result__item--overlay">
      <div class="result__item--description">
        <div class="d-flex justify-content-between">
          <div class="result__item--title">#{{item.nftIndex}} {{item.name}}</div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="result__item--by">By <span class="result__item--artist">{{item.owner}}</span></div>
        </div>
      </div>
    </div>
  </div>
</router-link>
<button class="text-danger" @click="deleteItem">Delete</button>
<!-- {{created(result.created)}} / {{created(result.updated)}} -->
</div>
</template>

<script>
import utils from '@/services/utils'

export default {
  name: 'SingleItem',
  props: ['item'],
  data () {
    return {
      likeIconTurquoise: require('@/assets/img/Favorite_button_turquoise_empty.png'),
      likeIconPurple: require('@/assets/img/Favorite_button_purple_empty.png')
    }
  },
  methods: {
    hoverIn (index) {
      this.dHover[index] = true
      this.componentKey += 1
    },
    hoverOut () {
      this.dHover = [false, false, false, false, false, false, false, false, false, false, false, false]
      this.componentKey += 1
    },
    toggleFavourite () {
      utils.makeFlasher(this.$refs.lndQrcode)
    },
    deleteItem () {
      this.$store.dispatch('myItemStore/deleteItem', this.item)
    }
  },
  computed: {
    assetUrl () {
      let assetUrl = '/assets/' + this.item.assetHash
      if (this.$route.name === 'my-assets') {
        assetUrl = '/my-assets/' + this.item.assetHash
      }
      return assetUrl
    }
  }
}
</script>
<style lang="scss" scoped>
#result-item {
  position: relative;
}
.flasher {
  width: 50px;
  height: 50px;
}
#result-item {
  /* ITEMS STYLE */

  & .result__item--overlay {
    display: flex;
    align-items: flex-end;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    cursor: pointer;
  }

  & .result__item--description {
    width: 100%;
    padding: 11px 18px;
    color: #fff;
    text-shadow: 0px 3px 6px #00000029;
    background: #50B1B5;
    opacity: 0;
    transition: opacity ease 0.3s;
  }

  & .result__item--overlay:hover .result__item--description {
    opacity: 0.95;
  }

  & .result__item--title {
    font-size: 1.4rem;
    font-weight: 400;
  }

  & .result__item--amount {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & .result__item--by {
    font-size: 1rem;
    font-weight: 300;
  }

  & .result__item--artist {
    font-size: 1rem;
    font-weight: 700;
  }

  & .result__item--price {
    font-size: 0.9rem;
    font-weight: 400;
  }

  & .result__item--like-btn {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFFFFF;
    font-size: 1.3rem;
    background-color: #50B1B5;
    padding: 10px 13px;
    border-radius: 50%;
    z-index: 3;
  }
  & .result__item--my-btn {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFFFFF;
    font-size: 13px;
    background-color: #9d50b5;
    padding: 10px 13px;
    border-radius: 50%;
    z-index: 3;
  }
}
</style>
