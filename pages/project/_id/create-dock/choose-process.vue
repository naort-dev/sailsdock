<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-for="(item, i) in items"
          :key="i"
          sm="12"
          md="6"
          align-self="center"
          class="pr-md-0 mb-2"
        >
          <b-card class="text-left">
            <div class="d-flex">
              <h3 class="d-block">{{ $t(item.title) }}</h3>
              <div class="d-block mb-2 ml-3 align-self-center font-bold-gray">
                {{ $t(item.time) }}
              </div>
            </div>
            <p>{{ $t(item.description) }}</p>
            <!-- <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
              <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
            </div> -->
            <div class="button --primary --block --round" @click="add(item)">
              <div class="w-100">{{ $t('select') }}</div>
            </div>
          </b-card>
        </b-col>
        <b-col sm="12">
          <div class="ui-user --border-bottom mt-5">
            <h1>{{ $t('yourSavedDeploymentConfigurations') }}</h1>
          </div>
          <div class="pt-2">
            <p>{{ $t('youDontHaveAnyDeploymentConfigurations') }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ChooseProcess',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    items: [
      {
        id: 1,
        type: 'cutAndRun',
        title: 'cutAndRunDeployment',
        description: 'cutAndRunDeploymentDesc',
        modal: false,
        time: 'Under 10s'
        // run away.
        // It is possible that it derives from ships making
        // a hasty departure by cutting the anchor rope and running with the wind.
      },
      {
        id: 2,
        type: 'gitAndPush',
        title: 'gitAndPushDeployment',
        description: 'gitAndPushDeploymentDesc',
        modal: false,
        time: 'Under 10s'
        // run away.
        // It is possible that it derives from ships making
        // a hasty departure by cutting the anchor rope and running with the wind.
      },
      {
        id: 3,
        type: 'handOverFist',
        title: 'handOverFistDeployment',
        description: 'handOverFistDeploymentDesc',
        modal: false,
        time: 'Under 1m'
        // quickly and continuously.
        // It describes the action of hauling on a rope using alternate hands,
        // so it is probably nautical. In the 18th century though,
        // it had a different meaning –“making steady progress”.
      },
      {
        id: 4,
        type: 'touchAndgo',
        title: 'touchAndgoDeployment',
        description: 'touchAndgoDeploymentDesc',
        modal: 'no-cms',
        time: 'Under 1m'
        // in a precarious situation.
        // This refers to the situation a vessel would be in, in shallow water,
        // when it touched the bottom but did not become grounded and was able to move off again.
      }
    ]
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', null)
    /* this.$store.commit(
      'page/setPageDesc',
      this.$t('deploymentProcessPageDescription')
    ) */
  },
  methods: {
    add(index) {
      this.$store.commit('dock/put', {})
      this.$store.commit('dock/push', { process: index.type })
      if (index.id === 1) {
        this.$router.push(
          `/project/${this.$route.params.id}/create-dock/cut-and-run/upload-project`
        )
      }
      if (index.id === 2) {
        this.$router.push(
          `/project/${this.$route.params.id}/create-dock/git-and-push/git-clone`
        )
      }
      if (index.id === 3) {
        this.$router.push(
          `/project/${this.$route.params.id}/create-dock/hand-over-fist/add-information`
        )
      }
      if (index.id === 4) {
        this.$router.push(
          `/project/${this.$route.params.id}/create-dock/touch-and-go/add-information`
        )
      }
    }
  },
  head() {
    return {
      title: this.$t('deploymentProcess')
    }
  }
}
</script>
