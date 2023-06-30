<template>
  <div class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col v-if="dockData.title" sm="12" align-self="center">
          <p>
            <b>Project:</b>&nbsp;
            <span
              class="overview-link"
              @click="$router.push(`/project/${project.id}/overview`)"
              >{{ project.projectTitle }}</span
            >&nbsp; <b>URL :</b>
            <span v-if="!dockData.isRunning">{{ dockData.domain }}</span>
            <a
              v-if="dockData.isRunning && dockData.model !== 'spa'"
              target="_blank"
              class="overview-link"
              :href="
                `http://${dockData.domain}${
                  dockData.source !== 's3' ? '/index.html' : ''
                }`
              "
              >{{ dockData.domain }}</a
            >
            <a
              v-if="dockData.isRunning && dockData.model === 'spa'"
              target="_blank"
              class="overview-link"
              :href="`https://${dockData.ip}/index.html`"
              >{{ dockData.ip }}</a
            >
            &nbsp;<b>Model:</b> {{ $t(dockData.model) }} &nbsp;<b>CMS:</b>
            {{ $t(dockData.cms) }} &nbsp;<b>Framework:</b>
            {{ $t(dockData.framework.title) }} &nbsp;<b>Theme:</b>
            {{ $t(dockData.theme) }} &nbsp;
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-tabs class="overview-tabs" vertical>
          <b-tab :title="$t('graphs')" class="pt-3"></b-tab>
          <b-tab :title="$t('access')" active class="pt-3"></b-tab>
          <b-tab :title="$t('power')" class="pt-3"></b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import cmsData from '~/data/create/dock/add-cms.js'
import dropletData from '~/data/create/dock/add-droplets.js'
import frameworksData from '~/data/create/dock/add-framework.js'
import modelsData from '~/data/create/dock/add-model.js'
import themesData from '~/data/create/dock/add-themes.js'
export default {
  layout: 'protected',
  middleware: 'authenticated',
  async asyncData({ route }) {
    const data = await route.params.id
    return { id: data }
  },
  data: () => ({
    themes: themesData,
    models: modelsData,
    frameworks: frameworksData,
    droplets: dropletData,
    cms: cmsData,
    suffix: {
      angular: ':8080',
      next: '',
      nuxt: '',
      react: ':8080',
      sapper: '',
      svelte: ':8080',
      vue: ''
    }
  }),
  computed: {
    collection() {
      return (
        this.$store.state.dock.collection.filter(
          (i) => i.id === this.$route.params.dockId
        )[0] || {}
      )
    },
    project() {
      return (
        this.$store.state.project.collection.filter(
          (i) => i.id === this.$route.params.id
        )[0] || {}
      )
    },
    dockData() {
      const dock = this.$store.state.dock.collection.filter(
        (i) => i.id === this.$route.params.dockId
      )[0]
      if (!dock) return {}
      console.log('dockdata12', dock.isRunning)
      const dockData = {}
      dockData.cms = cmsData.filter((cms) => cms.id === dock.cms)[0].title
      dockData.model = modelsData.filter(
        (model) => model.type === dock.model
      )[0].title
      dockData.framework =
        frameworksData.filter(
          (framework) => framework.id === dock.framework
        )[0] || {}
      if (dock.droplet) {
        dockData.droplet = dropletData.filter(
          (droplet) => droplet.id === dock.droplet
        )[0].title
      }

      dockData.theme = themesData.filter(
        (theme) => theme.id === dock.theme
      )[0].title
      dockData.source = dock.source
      dockData.title = dock.title
      dockData.isRunning = dock.isRunning
      dockData.description = dock.description
      dockData.model = dock.model
      dockData.domain = dock.domain
      if (dock.model === 'spa') {
        dockData.ip = dock.bucket + 'nyc3.digitaloceanspaces.com '
      } else if (dock.dock) dockData.ip = dock.dock.networks.v4[0].ip_address
      else dockData.ip = ''
      return dockData
    }
  },
  mounted() {
    this.$store.commit('page/setPageTitle', (this.$metaInfo || {}).title)
    this.$store.commit('dock/setCurrentProject', this.collection)
  },
  head() {
    return {
      title: (this.collection || {}).title
    }
  }
}
</script>
<style lang="scss">
.overview-link {
  cursor: pointer;
  color: blue;
}
</style>
