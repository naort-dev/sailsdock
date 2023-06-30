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
    </b-container>
  </div>
</template>

<script>
import Avatar from '~/components/blocks/app/Avatar.vue'
import SelectButton from '~/components/blocks/app/props/SelectButton.vue'
export default {
  name: 'General',
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
        link: '/settings/contact-details',
        iconLeft: 'icofont-ui-user',
        description: 'contactDetails',
        iconRight: 'chevron_right'
      },
      {
        link: '/settings/language',
        iconLeft: 'icofont-ui-map',
        description: 'language',
        iconRight: 'chevron_right'
      },
      {
        link: '/settings/marketing',
        iconLeft: 'icofont-ui-v-card',
        description: 'marketing',
        iconRight: 'chevron_right'
      },
      {
        link: '/settings/verified-emails',
        iconLeft: 'icofont-ui-email',
        description: 'verifiedEmails',
        iconRight: 'chevron_right'
      }
    ]
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', this.$t('generalPageDescription'))
  },
  head() {
    return {
      title: this.$t('general')
    }
  }
}
</script>
