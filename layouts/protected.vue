<template>
  <div>
    <Offscreens />
    <Sidebar />
    <Header />
    <Loading v-if="$store.state.loader" />
    <nuxt v-else />
  </div>
</template>

<script>
import Sidebar from '~/components/global/user/Sidebar.vue'
import Header from '~/components/global/user/Header.vue'
import Loading from '~/components/blocks/app/GlobalLoader.vue'
import Offscreens from '@/components/blocks/app/Offscreens.vue'

export default {
  components: {
    Sidebar,
    Header,
    Loading,
    Offscreens
  },
  middleware: 'authenticated',
  async beforeMount() {
    try {
      if (localStorage.getItem('nightMode') === 'false') {
        this.$store.commit('nightMode', false)
      } else if (localStorage.getItem('nightMode') === 'true') {
        this.$store.commit('nightMode', true)
      }
      // Binds it on client-side
      await this.$store.dispatch('user/collection')
      await this.$store.dispatch('project/collection')
      await this.$store.dispatch('dock/collection')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
