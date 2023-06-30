<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="6" align-self="center">
          <SelectButton :items="buttons" />
        </b-col>
        <b-col
          sm="6"
          align-self="center"
          class="text-center text-md-right pr-md-0"
        >
          <Avatar />
        </b-col>
      </b-row>
      <div class="button --primary" @click="$store.dispatch('auth/logoutUser')">
        <div class="w-100">{{ $t('signOut') }}</div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Avatar from '~/components/blocks/app/Avatar.vue'
import SelectButton from '~/components/blocks/app/props/SelectButton.vue'
export default {
  name: 'Overview',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    SelectButton,
    Avatar
  },
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null,
    buttons: [
      {
        link: '/settings/general',
        iconLeft: 'icofont-ui-touch-phone',
        description: 'general',
        iconRight: 'chevron_right'
      },
      {
        link: '/support/overview',
        iconLeft: 'icofont-ui-head-phone',
        description: 'support',
        iconRight: 'chevron_right'
      },
      {
        link: '/settings/security-and-privacy',
        iconLeft: 'icofont-ui-lock',
        description: 'securityAndPrivacy',
        iconRight: 'chevron_right'
      }
    ]
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', this.$t('profilePageDescription'))
  },
  head() {
    return {
      title: this.$t('profile')
    }
  }
}
</script>
