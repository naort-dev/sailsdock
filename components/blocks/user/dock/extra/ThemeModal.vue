<template>
  <transition-group key="1" name="fade-in">
    <b-modal id="theme-modal" key="2" :title="theme.title" size="lg" ok-only>
      <Carousel :images="theme.images || []" />
      <p class="mt-3">
        {{ theme.long_desc }}
      </p>
      <template v-slot:modal-footer>
        <b-link :href="theme.url" variant="info" class="mr-auto">{{
          theme.see_demo
        }}</b-link>
        <b-button variant="primary" @click="chooseTheme">{{
          $t('chooseTheme')
        }}</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('theme-modal')"
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
    theme: {
      type: Object,
      default: null
    }
  },
  methods: {
    chooseTheme(i) {
      this.$store.commit('dock/chooseTheme', this.theme)
      this.$store.commit('dock/toggle', 'technologies')
    }
  }
}
</script>
