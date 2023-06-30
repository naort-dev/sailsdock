<template>
  <div>
    <b-container :class="containerClass">
      <b-row :class="rowClass">
        <b-col :sm="colSm" :lg="colLg">
          <b-input-group :class="bInputGroupClass">
            <b-input-group-prepend>
              <span class="material-icons --prepend --round-left ui-gray">
                search
              </span>
            </b-input-group-prepend>
            <b-form-input
              v-model="search"
              class="--round-right --searchbar"
              type="search"
              :placeholder="placeholder"
              :aria-label="ariaLabel"
              @keyup.enter="$emit('search-github-repositories')"
            />
            <b-input-group-append v-if="enableSearchButton">
              <div
                class="search-btn"
                @click="$emit('search-github-repositories')"
              >
                {{ $t('search') }}
              </div>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  props: {
    containerClass: {
      type: String,
      default: null
    },
    rowClass: {
      type: String,
      default: null
    },
    colSm: {
      type: Number,
      default: null
    },
    colLg: {
      type: Number,
      default: null
    },
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
    bInputGroupClass: {
      type: String,
      default: null
    },
    enableSearchButton: {
      type: Boolean,
      default: null
    },
    searchGithubRepositories: {
      type: Function,
      default: null
    },
    searchQueryObject: {
      type: String,
      default: () => this.$store.state.search.query
    },
    updateSearchQuery: {
      type: String,
      default: 'search/updateSearchQuery'
    },
    addSearchableCollection: {
      type: String,
      default: 'search/addSearchableCollection'
    }
  },
  computed: {
    search: {
      get() {
        return this.searchQueryObject
      },
      set(value) {
        this.$store.commit(this.updateSearchQuery, value)
      }
    }
  },
  created() {
    this.$store.commit(this.addSearchableCollection, this.collection)
  }
}
</script>
<style lang="scss">
.searchbar {
  &.--wrapper {
    border: 1px solid #f0eeeb;
    border-radius: 3rem;
    padding-left: 1rem;
  }
}
</style>
