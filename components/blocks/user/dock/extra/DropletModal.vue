<template>
  <transition-group key="1" name="fade-in">
    <b-modal
      id="droplet-modal"
      key="2"
      :title="droplet.title"
      size="lg"
      ok-only
    >
      <p class="mt-3">
        {{ droplet.long_desc }}
      </p>
      <template v-slot:modal-footer>
        <b-button variant="primary" @click="chooseDroplet">{{
          $t('chooseDroplet')
        }}</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('droplet-modal')"
          >Close</b-button
        >
      </template>
    </b-modal>
  </transition-group>
</template>
<script>
export default {
  props: {
    droplet: {
      type: Object,
      default: null
    }
  },
  methods: {
    chooseDroplet(i) {
      this.$store.commit('dock/chooseDroplet', this.droplet)
      const newDock = this.$store.state.dock.new_dock
      newDock.droplet = this.droplet.id
      this.$store.dispatch('dock/createDock', newDock)
    }
  }
}
</script>
