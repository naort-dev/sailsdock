<template>
  <div>
    <Modal
      v-if="selectedModal"
      :id="'theme-modal'"
      :data="selectedModal"
      :add="add"
    />
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="12" lg="6">
          <b-input-group class="mt-3 mb-5">
            <b-input-group-prepend>
              <span class="material-icons --prepend --round-left">
                search
              </span>
            </b-input-group-prepend>
            <b-form-input
              v-model="search"
              class="--round-right"
              type="search"
              :placeholder="placeholder"
              :aria-label="ariaLabel"
            />
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-for="(content, i) in $store.getters['search/filtered']"
          :key="i"
          sm="12"
          md="6"
          align-self="center"
          class="pr-md-0 mb-2"
        >
          <b-card class="text-left">
            <h3>{{ $t(content.title) }}</h3>
            <p>{{ $t(content.short_desc) }}</p>
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
import Modal from '~/components/blocks/app/props/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    collection: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    ariaLabel: {
      type: String,
      default: null
    },
    add: {
      type: Function,
      default: null
    }
  },
  data: () => ({
    selectedModal: null
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.search.query
      },
      set(value) {
        this.$store.commit('search/updateSearchQuery', value)
      }
    }
  },
  methods: {
    modalFunction(i) {
      this.selectedModal = this.collection[i]
      this.$bvModal.show('theme-modal')
    }
  },
  created() {
    this.$store.commit('search/addSearchableCollection', this.collection)
  }
}
</script>
