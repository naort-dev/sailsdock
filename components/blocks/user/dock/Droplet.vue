<template>
  <div>
    <DropletModal v-if="selectedDroplet" :droplet="selectedDroplet" />
    <div class="ui-user --display">
      <b-container class="pl-5">
        <b-row class="justify-content-start h-100 w-100">
          <b-col sm="12" align-self="center">
            <span class="ui-size --lg">{{
              $t('pickAdropletTitle') + ' '
            }}</span>
          </b-col>
          <b-col
            v-for="(droplet, i) in droplets"
            :key="i"
            md="6"
            class="pt-5 cursor-pointer"
            @click="dropletDetail(i)"
          >
            <div class="card mb-4 news-card">
              <div class="card-body">
                <b-row>
                  <b-col sm="12">
                    <h3 class="card-title">{{ droplet.title }}</h3></b-col
                  >
                </b-row>
                <div>
                  <p>
                    {{ droplet.short_desc.slice(0, 200) }}
                    {{ droplet.short_desc.length > 200 ? '...' : '' }}
                  </p>
                </div>
                <!-- <b-button variant="primary">{{ droplet.see_demo }}</b-button> -->
                <div class="text-center">
                  <b-button
                    variant="primary"
                    class="center"
                    @click="chooseDroplet(i)"
                    >{{ $t('chooseDroplet') }}</b-button
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import DropletData from './data/droplets.js'
import DropletModal from './extra/DropletModal'
export default {
  components: {
    DropletModal
  },
  data: () => ({
    droplets: DropletData,
    selectedDroplet: null
  }),
  methods: {
    dropletDetail(i) {
      // this.$store.commit('dock/chooseDroplet', this.droplets[i])
      // this.$store.commit('dock/toggle', 'dropletModal')
      this.selectedDroplet = this.droplets[i]
      this.$bvModal.show('droplet-modal')
    },
    chooseDroplet(i) {
      this.$store.commit('dock/chooseDroplet', this.droplets[i])
      const newDock = this.$store.state.dock.new_dock
      newDock.droplet = this.droplets[i].id
      this.$store.dispatch('dock/createDock', newDock)
    }
  }
}
</script>
