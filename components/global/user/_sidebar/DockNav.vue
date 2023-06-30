<template>
  <div v-if="$route.params.id">
    <nav class="sidebar --nav">
      <div
        aria-current="page"
        class="sidebar --link --parent hover--theme --cl"
        @click="$router.push('/')"
      >
        <i :class="home.icon_class">{{ home.icon }}</i>
        <div class="sidebar --link --child pointer">
          {{ home.title }}
        </div>
      </div>
      <!-- Dock menu title -->
      <div
        class="pt-2 pb-3 ui-size --xs text-white pointer hover--theme --cl"
        @click="$router.push(`/project/${routeParam}/overview`)"
      >
        {{ singleProjectCollection.projectTitle }}
      </div>
      <!-- Create new dock -->
      <div
        aria-current="page"
        class="sidebar --link --parent hover--theme --cl"
        @click="
          $router.push(
            `/project/${$route.params.id}/create-dock/choose-process`
          )
        "
      >
        <i :class="dock.icon_class">{{ dock.icon }}</i>
        <div class="sidebar --link --child pointer hover--theme --cl">
          {{ dock.title }}
        </div>
      </div>
      <div
        v-for="(link, i) in collection"
        :key="i"
        aria-current="page"
        class="sidebar --link --parent hover--theme --cl"
        @click="
          $router.push(`/project/${$route.params.id}/dock/${link.id}/overview`)
        "
      >
        <i class="icofont-ui-touch-phone"></i>
        <div class="sidebar --link --child pointer">
          {{ link.title }}
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    home: {
      title: 'Home',
      url: '/',
      icon_class: 'material-icons',
      icon: 'home',
      active: true,
      id: 1
    },
    dockOverview: {
      title: 'Project overview',
      icon_class: 'material-icons',
      icon: 'folder_open',
      active: true,
      id: 1
    },
    dock: {
      title: 'New dock',
      icon_class: 'material-icons',
      icon: 'add',
      active: true,
      id: 2
    }
  }),
  computed: {
    collection() {
      return this.$store.state.dock.collection.filter(
        (dock) => dock.project_id === this.$route.params.id
      )
    },
    routeParam() {
      return this.$route.params.id
    },
    singleProjectCollection() {
      return this.$store.state.project.collection.filter(
        (i) => i.id === this.$route.params.id
      )
    }
    /* singleProjectCollection() {
      return (
        this.$store.state.project.collection.filter(
          (i) => i.id === this.$route.params.id
        )[0] || {}
      )
    } */
  }
}
</script>
