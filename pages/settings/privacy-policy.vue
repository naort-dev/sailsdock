<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="6" align-self="center" class="pr-md-0">
          <h3>{{ $t('comingSoon') }}</h3>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    // Send the welcome message
    this.$store.commit(
      'page/setPageDesc',
      this.$t('privacyPolicyPageDescription')
    )
  },
  head() {
    return {
      title: this.$t('privacyPolicy')
    }
  }
}
</script>
