<template>
  <div class="sidebar --panel">
    <nuxt-link to="/">
      <Logo color="white" />
    </nuxt-link>
    <ProjectNav />
    <DockNav />
    <AppNav />
    <ProfileNav />
  </div>
</template>
<script>
import ProjectNav from './_sidebar/ProjectNav'
import DockNav from './_sidebar/DockNav'
import AppNav from './_sidebar/AppNav'
import ProfileNav from './_sidebar/ProfileNav'
import Logo from '~/components/blocks/app/Logo.vue'
export default {
  components: {
    Logo,
    ProjectNav,
    DockNav,
    AppNav,
    ProfileNav
  },
  async asyncData({ route }) {
    const data = await route.path
    return {
      route: data
    }
  }
}
</script>
