<template>
  <div class="h-100">
    <Loading v-if="$store.state.loader" />
    <nuxt v-else />
  </div>
</template>
<script>
import Loading from '~/components/blocks/app/GlobalLoader.vue'
export default {
  middleware: 'anonymous',
  components: {
    Loading
  }
}
</script>
