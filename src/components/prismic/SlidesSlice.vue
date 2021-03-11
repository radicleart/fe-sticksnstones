<template>
<section>
<div>
  <div class='post-part single'>
    <prismic-rich-text class="textslice" :field="slice.primary.title_of_the_slice"/>
  </div>
  <div v-if="slice.items" class='post-part single'>
    <vueper-slides>
      <vueper-slide v-for="(item, index) in slice.items" :key="'slice-item-' + index">
        <template v-slot:slice>
          <prismic-items :prismicItems="item[index].card_title"></prismic-items>
          <div class="row">
            <prismic-items :prismicItems="item.slide[index]"></prismic-items>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</div>
</section>
</template>

<script>
import PrismicItems from '@/components/prismic/PrismicItems'
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
  name: 'TextSlice',
  components: {
    PrismicItems,
    VueperSlides,
    VueperSlide
  },
  props: ['slice']
}
</script>
