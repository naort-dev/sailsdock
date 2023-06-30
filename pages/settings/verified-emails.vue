<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="6" align-self="center" class="pr-md-0">
          <div
            v-if="!$store.state.user.collection.emailVerified"
            class="button --primary"
            style="display: flex!important;"
            @click="$store.dispatch('auth/sendSignInLinkToEmail')"
          >
            <div class="w-100">{{ $t('verifyEmail') }}</div>
          </div>
          <h3 v-else>{{ $t('emailIsVerified') }}</h3>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'VerifiedEmails',
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
      this.$t('verifiedEmailsPageDescription')
    )
  },
  head() {
    return {
      title: this.$t('verifiedEmails')
    }
  }
}
</script>
