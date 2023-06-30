<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <FilteredCards :collection="collection" :add="add" />
  </div>
</template>

<script>
import collection from '~/data/create/dock/add-themes.js'
import FilteredCards from '~/components/blocks/app/props/FilteredCards.vue'
export default {
  name: 'AddThemes',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    FilteredCards
  },
  data: () => ({
    selectedModal: null,
    collection
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    // this.$store.commit('page/setPageDesc', this.$t('themesPageDescription'))
  },
  methods: {
    add(index) {
      const theme = { theme: index.id }
      this.$store.commit('dock/push', theme)
      this.$router.push(
        String(
          `/project/${this.$route.params.id}/create-dock/advanced-deployment/add-framework`
        )
      )
    }
  },
  head() {
    return {
      title: this.$t('themes')
    }
  }
}
</script>
