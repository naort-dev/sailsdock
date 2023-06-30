<template>
  <div>
    <nav v-if="$route.params.id && collection" class="sidebar --nav">
      <div />
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    dockOverview: {
      title: 'Project overview',
      icon: 'icofont-ui-folder',
      active: true,
      id: 1
    },
    dock: {
      title: 'New dock',
      icon: 'icofont-ui-add',
      active: true,
      id: 2
    }
  }),
  computed: {
    collection() {
      return this.$store.state.dock.collection
    },
    routeParam() {
      return this.$route.params.id
    },
    singleProjectCollection() {
      return (
        this.$store.state.project.collection.filter(
          (i) => i.id === this.$route.params.id
        )[0] || {}
      )
    }
  }
}
</script>
