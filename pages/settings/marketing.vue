<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          sm="6"
          align-self="center"
          class="text-center text-md-right pr-md-0"
        >
          <section>
            <div class="select-button --wrapper ui-user --border-bottom">
              <div class="select-button --icon-left">
                <i
                  class="icofont-ui-message"
                  style="font-weight: 600 !important;"
                />
              </div>
              <div class="select-button --desc">
                {{ $t('newsletters') }}
              </div>
              <div
                class="select-button --icon-right"
                @click="updateUserCollection()"
              >
                <ToggleButton :value="marketing.newsletter" />
              </div>
            </div>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ToggleButton from '~/components/blocks/app/props/ToggleButton.vue'
export default {
  name: 'Marketing',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    ToggleButton
  },
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null,
    marketing: {
      newsletter: true
    }
  }),
  mounted() {
    this.marketing.newsletter = this.$store.state.user.collection.marketing.newsletter
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', this.$t('marketingPageDescription'))
  },
  methods: {
    async updateUserCollection() {
      this.marketing.newsletter = !this.marketing.newsletter
      const userRef = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
      try {
        await userRef.update({
          marketing: {
            newsletter: this.marketing.newsletter
          }
        })
      } catch (e) {
        this.$store.dispatch('error', e, { root: true })
      }
    }
  },
  head() {
    return {
      title: this.$t('marketing')
    }
  }
}
</script>
