<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          sm="6"
          align-self="center"
          class="text-center text-md-right pr-md-0"
        >
          <div />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'VerifyEmail',
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
      this.$t('verifyEmailPageDescription')
    )
    // Verify email
    this.updateUserCollection()
  },
  methods: {
    async updateUserCollection() {
      const userRef = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
      try {
        await userRef.update({
          emailVerified: true
        })
      } catch (e) {
        this.$store.dispatch('error', e, { root: true })
      }
    }
  },
  head() {
    return {
      title: this.$t('emailIsVerified')
    }
  }
}
</script>
