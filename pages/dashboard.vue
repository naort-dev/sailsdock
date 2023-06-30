<template>
  <div class="ui-user --display h-100">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          v-if="!$store.state.project.collection.lenght < 1"
          sm="6"
          align-self="center"
        >
          <span class="ui-size --lg">{{ $t('noExistingProjects') + ' ' }}</span>
          <div class="button --primary --block" @click="add(item)">
            <div class="w-100">{{ $t('createOneNow') }}</div>
          </div>
        </b-col>
        <b-col
          v-for="(project, i) in $store.state.project.collection"
          :key="i"
          sm="2"
          class="mt-2 mb-2 pointer select-none"
          @click="$router.push(`/project/${project.id}/overview`)"
        >
          <img class="img-fluid pointer" :src="project.image" />
          <div class="pt-2 text-center pointer text-xl">
            {{ project.projectTitle }}
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null
  }),
  mounted() {
    this.setPage()
  },
  methods: {
    setPage() {
      // Get meta title and commit it to the page title
      this.$store.commit('page/setPageTitle', this.$metaInfo.title)
      // Get time for the dynamic greeting
      const date = new Date()
      const hours = date.getHours()
      if (hours < 12) {
        this.dynamicGreeting = this.$t('goodMorning')
      } else if (hours >= 12 && hours <= 17) {
        this.dynamicGreeting = this.$t('goodAfternoon')
      } else if (hours >= 17 && hours <= 24) {
        this.dynamicGreeting = this.$t('goodEvening')
      }
      // Page Description
      if (this.$store.state.user.collection.displayName) {
        this.structuredDescription =
          this.dynamicGreeting +
          ' ' +
          this.$store.state.user.collection.displayName.split(' ')[0]
        // Send the welcome message
        this.$store.commit('page/setPageDesc', this.structuredDescription)
      }
    }
  },
  head() {
    return {
      title: this.$t('dashboard')
    }
  }
}
</script>
