<template>
  <div class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100 ui-user">
        <b-col sm="12" md="10" align-self="center" class="pl-0 pr-0">
          <b-tabs class="overview-tabs">
            <b-tab :title="$t('resources')" active class="pt-3"
              ><Resources
            /></b-tab>
            <b-tab :title="$t('activity')" class="pt-3"
              ><Activity :project="project"
            /></b-tab>
            <b-tab :title="$t('dns')" class="pt-3"><Dns /></b-tab>
            <b-tab :title="$t('settings')" class="pt-3"
              ><Settings :project="project"
            /></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Resources from '~/components/pages/project/_id/overview/Resources.vue'
import Activity from '~/components/pages/project/_id/overview/Activity.vue'
import Dns from '~/components/pages/project/_id/overview/dns/Dns.vue'
import Settings from '~/components/pages/project/_id/overview/Settings.vue'
export default {
  components: {
    Resources,
    Activity,
    Dns,
    Settings
  },
  layout: 'protected',
  middleware: 'authenticated',
  async asyncData({ route }) {
    const data = await route.params.id
    return { id: data }
  },
  computed: {
    project() {
      return (
        this.$store.state.project.collection.filter(
          (i) => i.id === this.$route.params.id
        )[0] || {}
      )
    }
  },
  mounted() {
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    this.$store.commit('page/setPageDesc', this.project.projectDescription)
    this.$store.commit('dock/setCurrentProject', this.project)
  },
  head() {
    return {
      title: this.project.projectTitle
    }
  }
}
</script>
<style lang="scss">
.overview-tabs {
  max-width: 100%;
  @media (min-width: 768px) {
    width: 100%;
  }
}
</style>
