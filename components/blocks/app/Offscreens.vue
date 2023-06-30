<template>
  <div>
    <transition name="from-right-to-left-down">
      <GithubLibrarySidebar
        v-if="$store.state.offscreen.toggle.githubLibrary"
      />
    </transition>
  </div>
</template>
<script>
import GithubLibrarySidebar from '@/components/blocks/app/sidebars/GithubLibrary.vue'
export default {
  components: {
    GithubLibrarySidebar
  }
}
</script>
