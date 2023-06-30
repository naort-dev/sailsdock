<template>
  <transition-group key="1" name="fade-in">
    <b-modal
      id="technology-modal"
      key="2"
      :title="technology.title"
      size="lg"
      ok-only
    >
      <Carousel :images="technology.images || []" />
      <p class="mt-3">
        {{ technology.long_desc }}
      </p>
      <template v-slot:modal-footer>
        <b-link :href="technology.url" variant="info" class="mr-auto">{{
          technology.see_demo
        }}</b-link>
        <b-button variant="primary" @click="chooseTechnology">{{
          $t('chooseTechnology')
        }}</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('technology-modal')"
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
    technology: {
      type: Object,
      default: null
    }
  },
  methods: {
    chooseTechnology(i) {
      this.$store.commit('dock/chooseTechnology', this.technology)
      this.$store.commit('dock/toggle', 'droplet')
    }
  }
}
</script>
