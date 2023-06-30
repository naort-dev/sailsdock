<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <Modal
      v-if="selectedModal"
      :id="'droplet-modal'"
      :data="selectedModal"
      :add="add"
    />
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-for="(content, i) in droplets"
          :key="i"
          sm="12"
          md="6"
          align-self="center"
          class="pr-md-0 mb-2"
        >
          <b-card class="text-left">
            <h3>{{ $t(content.title) }}</h3>
            <p>{{ $t(content.short_description) }}</p>
            <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
              <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
            </div>
            <div class="button --primary --block" @click="add(content)">
              <div class="w-100">
                <i class="icofont-ui-add" />{{ ' ' + $t('add') }}
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import dropletData from '~/data/create/dock/add-droplets.js'
import Modal from '~/components/blocks/app/props/Modal.vue'
export default {
  name: 'AddDroplet',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    Modal
  },
  data: () => ({
    selectedModal: null,
    droplets: dropletData
  }),
  computed: {
    collection() {
      return this.$store.state.dock.collection
    }
  },
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    // Send the welcome message
    // this.$store.commit('page/setPageDesc', this.$t('dropletPageDescription'))
    this.$store.commit('dock/setCurrentProject', { id: this.$route.params.id })
  },
  methods: {
    async add(index) {
      const droplet = { droplet: index.id }
      await this.$store.commit('dock/push', droplet)
      // Push the user to its created dock
      this.$store.dispatch('dock/createDock')
      // this.$router.push(
      //   String(
      //     `/project/${this.$route.params.id}/dock/${
      //       this.collection
      //         .filter((i) => i.id === this.$route.params.id)
      //         .map((i) => i.id)[0]
      //     }/overview`
      //   )
      // )
    },
    modalFunction(i) {
      this.selectedModal = this.droplets[i]
      this.$bvModal.show('droplet-modal')
    }
  },
  head() {
    return {
      title: this.$t('droplet')
    }
  }
}
</script>
