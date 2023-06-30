<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <Modal
      v-if="selectedModal"
      :id="'framework-modal'"
      :data="selectedModal"
      :add="add"
    />
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-for="(content, i) in frameworks"
          :key="i"
          sm="12"
          md="6"
          align-self="center"
          class="pr-md-0 mb-2"
        >
          <b-card
            v-if="
              $store.state.dock.new_dock.model !== 'spa' ||
                ($store.state.dock.new_dock.model === 'spa' && content.spa)
            "
            class="text-left"
          >
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
import frameworksData from '~/data/create/dock/add-framework.js'
import Modal from '~/components/blocks/app/props/Modal.vue'
export default {
  name: 'AddCms',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    Modal
  },
  data: () => ({
    selectedModal: null,
    frameworks: frameworksData
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    // Send the welcome message
    // this.$store.commit('page/setPageDesc', this.$t('frameworkPageDescription'))
  },
  methods: {
    add(index) {
      const framework = { framework: index.id }
      this.$store.commit('dock/push', framework)
      if (this.$store.state.dock.new_dock.model === 'spa') {
        this.$store.dispatch('dock/createDock')
      } else {
        this.$router.push(
          String(
            `/project/${this.$route.params.id}/create-dock/advanced-deployment/add-droplet`
          )
        )
      }
    },
    modalFunction(i) {
      this.selectedModal = this.frameworks[i]
      this.$bvModal.show('framework-modal')
    }
  },
  head() {
    return {
      title: this.$t('webFramework')
    }
  }
}
</script>
