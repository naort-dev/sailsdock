<template>
  <div
    class="ui-avatar-menu --wrapper"
    :class="{ 'display-mode --theme-dark': $store.state.nightMode }"
  >
    <!-- Profile section -->
    <div
      class="text-left text-transform --capitalize pointer"
      @click="
        $router.push('/settings/contact-details'),
          $store.commit('nav/avatarMenu')
      "
    >
      <Avatar
        width="48"
        height="48"
        style="border-radius: 50%; border: 2px solid #ddd;"
      />
      {{ name }}
    </div>
    <!-- Edit profile section -->
    <div
      style="display: flex;"
      class="pt-3 pb-3 text-left pointer"
      @click="
        $router.push('/settings/general'), $store.commit('nav/avatarMenu')
      "
    >
      <!-- <ToggleButton class="mr-1" /> -->
      {{ $t('manageYourProfile') }}
    </div>
    <!-- Nightmode section -->
    <NightModeSwitch />
    <!-- Language -->
    <div class="w-100 text-left">
      <div
        style="display: inline-block;"
        class="pt-3 pb-3 text-left pointer"
        @click="
          $router.push('/settings/language'), $store.commit('nav/avatarMenu')
        "
      >
        <!-- <ToggleButton class="mr-1" /> -->
        {{ $t('language') }}
      </div>
    </div>
    <!-- Logout -->
    <div class="w-100 text-left">
      <div
        style="display: inline-block;"
        class="pt-3 pb-3 text-left pointer"
        @click="
          $store.dispatch('auth/logoutUser'), $store.commit('nav/avatarMenu')
        "
      >
        <!-- <ToggleButton class="mr-1" /> -->
        {{ $t('signOut') }}
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '~/components/blocks/app/Avatar.vue'
import NightModeSwitch from '~/components/blocks/app/NightModeSwitch.vue'

export default {
  components: {
    Avatar,
    NightModeSwitch
  },
  computed: {
    name() {
      return this.$store.state.user.collection.displayName.split(' ')[0]
    },
    lastname() {
      return this.$store.state.user.collection.displayName
        .split(' ')[1]
        .slice(0, 1)
    }
  }
}
</script>
<style lang="scss">
.ui-avatar-menu {
  &.--wrapper {
    padding: 1rem;
    position: absolute;
    background: #fdfdfd;
    border-radius: 0.5rem;
    right: 0;
    margin-top: 1rem;
    border-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 4;
    border: 1px solid #f0eeeb;
  }
  &.--button {
    display: inline-block;
    border-radius: 25%;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
}
</style>
