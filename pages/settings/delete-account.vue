<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="12" align-self="center" class="text-left">
          <div class="mt-5 mb-5" v-html="$t('deletionDescription')" />
          <div
            class="button --primary"
            @click="$store.dispatch('auth/deleteUser')"
          >
            <div class="w-100">{{ $t('deleteAccount') }}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'DeleteAccount',
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
    this.$store.commit(
      'page/setPageDesc',
      this.$t('deleteAccountPageDescription')
    )
  },
  head() {
    return {
      title: this.$t('deleteAccount')
    }
  }
}
</script>
