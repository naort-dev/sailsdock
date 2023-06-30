<template>
  <div>
    <nav v-if="!$route.params.id && collection" class="sidebar --nav">
      <!-- Title -->
      <div class="pt-2 pb-3 ui-size --xs text-white hover--theme --cl">
        {{ $t('projects') }}
      </div>
      <!-- Create new project -->
      <div
        aria-current="page"
        class="sidebar --link --parent hover--theme --cl"
        @click="$router.push('/new-project')"
      >
        <i class="material-icons">add</i>
        <div class="sidebar --link --child pointer">
          {{ newCollection.title }}
        </div>
      </div>
      <div
        v-for="(link, i) in collection"
        :key="i"
        aria-current="page"
        class="sidebar --link --parent hover--theme --cl"
        @click="$router.push(`/project/${link.id}/overview`)"
      >
        <i class="material-icons">code</i>
        <div class="sidebar --link --child pointer">
          {{ link.projectTitle }}
        </div>
      </div>
    </nav>
    <!-- Single selected project | Not in use - do not remove -->
    <!-- <nav v-if="routeParam" class="sidebar --nav">
      <div class="pt-2 pb-3 ui-size --xs text-white">{{ $t('project') }}</div>
      <div
        aria-current="page"
        class="sidebar --link --parent"
        @click="$router.push(`/project/${routeParam}/overview`)"
      >
        <i :class="overview.icon"></i>
        <div class="sidebar --link --child pointer">
          {{ singleCollection.projectTitle }}
        </div>
      </div>
    </nav>  -->
  </div>
</template>
<script>
export default {
  data: () => ({
    overview: {
      title: 'Project overview',
      icon: 'icofont-ui-folder',
      active: true,
      id: 1
    },
    newCollection: {
      title: 'New project',
      url: '/new-project',
      icon: 'icofont-ui-add',
      active: true,
      id: 2
    }
  }),
  computed: {
    routeParam() {
      return this.$route.params.id
    },
    collection() {
      return this.$store.state.project.collection
    },
    singleCollection() {
      return (
        this.collection.filter((i) => i.id === this.$route.params.id)[0] || {}
      )
    }
  }
}
</script>
