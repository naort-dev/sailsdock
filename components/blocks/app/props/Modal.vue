<template>
  <transition-group key="1" name="fade-in">
    <b-modal :id="id" key="2" :title="data.title" size="lg" ok-only>
      <Carousel v-if="data.images" :images="data.images || []" />
      <p v-if="data.long_desc" class="mt-3">
        {{ data.long_desc }}
      </p>
      <template v-slot:modal-footer>
        <b-link
          v-if="data.see_demo && data.url"
          :href="data.url"
          variant="info"
          class="mr-auto"
          >{{ data.see_demo }}</b-link
        >
        <b-button variant="primary" @click="add(data)">{{
          $t('add')
        }}</b-button>
        <b-button variant="secondary" @click="$bvModal.hide(id)"
          >Close</b-button
        >
      </template>
    </b-modal>
  </transition-group>
</template>
<script>
import Carousel from '~/components/blocks/app/Carousel.vue'
export default {
  components: {
    Carousel
  },
  props: {
    id: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    add: {
      type: Function,
      default: null
    }
  }
}
</script>
