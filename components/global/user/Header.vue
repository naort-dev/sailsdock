<template>
  <div class="ui-user --display mb-5">
    <b-container fluid class="pl-0 pr-0 mr-0 ml-0 ui-top-header --wrapper">
      <b-row
        align-h="between"
        class="h-100 w-100 ui-user --border-bottom pl-0 pr-0 mr-0 ml-0 pt-2 pb-2"
      >
        <b-col cols="9" align-self="center" class="pl-0">
          <Searchbar
            :search-query-object="$store.state.search.query"
            container-class="pl-5"
            row-class="justify-content-start h-100 w-100"
            :col-sm="12"
            :col-lg="6"
          />
        </b-col>
        <b-col cols="2" align-self="center" class="text-right">
          <div>
            <div class="inline-block align-self-center pl-2 pr-2">
              <i
                class="material-icons ui-gray pointer"
                @click="$router.push(`/support/overview`)"
              >
                contact_support
              </i>
            </div>
            <div class="inline-block align-self-center  pl-2">
              <i class="material-icons ui-gray">
                notifications_none
              </i>
            </div>
          </div>
        </b-col>
        <b-col
          cols="1"
          align-self="center"
          class="text-right"
          style="border-left: 0.1rem solid #f0eeeb;"
        >
          <div style="display: flex; flex-wrap: wrap;">
            <div class="inline-block align-self-center">
              <div @click="$store.commit('nav/avatarMenu')">
                <Avatar
                  width="48"
                  height="48"
                  style="border-radius: 50%; border: 2px solid #ddd;"
                  class="pointer"
                  @click="$store.commit('nav/avatarMenu')"
                />
              </div>
              <transition name="fade-in-down">
                <AvatarMenu
                  v-if="$store.state.nav.avatar.toggle.menuIsActive"
                />
              </transition>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100 ui-user --border-bottom">
        <b-col sm="12" md="10" align-self="center" class="pt-3 pb-3">
          {{ $nuxt.meta }}
          <div class="page-title">{{ $store.state.page.title }}</div>
          <div v-if="$store.state.page.desc" class="page-description pt-3">
            {{ $store.state.page.desc }}
          </div>
        </b-col>
      </b-row>
      <!-- {{ $store.state.dock.new_dock }} -->
    </b-container>
  </div>
</template>
<script>
import Avatar from '~/components/blocks/app/Avatar.vue'
import AvatarMenu from '~/components/global/user/desktop/AvatarMenu.vue'
import Searchbar from '~/components/blocks/app/props/Searchbar.vue'
export default {
  components: {
    Avatar,
    AvatarMenu,
    Searchbar
  }
}
</script>
<style lang="scss">
.page-title {
  font-weight: bold;
  font-size: 36px;
  line-height: 40px;
}
.ui-top-header {
  &.--wrapper {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  }
}
</style>
