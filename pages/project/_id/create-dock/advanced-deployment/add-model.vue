<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <Modal
      v-if="selectedModal"
      :id="'model-modal'"
      :data="selectedModal"
      :add="add"
    />
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-for="(content, i) in models"
          :key="i"
          sm="12"
          md="6"
          align-self="center"
          class="pr-md-0 mb-2"
        >
          <b-card class="text-left">
            <h3>{{ $t(content.title) }}</h3>
            <p>{{ $t(content.description.short) }}</p>
            <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
              <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
            </div>
            <div class="button --primary --block --round" @click="add(content)">
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
import modelsData from '~/data/create/dock/add-model.js'
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
    models: modelsData
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // this.$store.commit('page/setPageDesc', this.$t('modelPageDescription'))
  },
  methods: {
    add(index) {
      const model = { model: index.id }
      this.$store.commit('dock/push', model)
      this.$router.push(
        String(
          `/project/${this.$route.params.id}/create-dock/advanced-deployment/add-theme`
        )
      )
    },
    modalFunction(i) {
      this.selectedModal = this.models[i]
      this.$bvModal.show('model-modal')
    }
  },
  head() {
    return {
      title: this.$t('webAppModel')
    }
  }
}
</script>
