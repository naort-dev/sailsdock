<template>
  <b-row>
    <b-col
      v-if="!this.$store.state.dock.collection < 1"
      sm="12"
      align-self="center"
    >
      <div class="ui-size --md">{{ $t('noExistingDocks') + ' ' }}</div>
      <div
        class="button --primary --block mt-3"
        @click="
          $router.push(
            `/project/${$route.params.id}/create-dock/choose-process`
          )
        "
      >
        <div class="w-100">{{ $t('createOneNow') }}</div>
      </div>
    </b-col>
    <b-col
      v-for="(dock, i) in $store.state.dock.collection"
      :key="i"
      sm="2"
      class="mt-2 mb-2 pointer select-none"
      @click="$router.push(`/project/${dock.id}/overview`)"
    >
      <img class="img-fluid pointer" :src="dock.image" />
      <div class="pt-2 text-center pointer text-xl">
        {{ dock.projectTitle }}
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    collection: {
      type: Array,
      default: null
    }
  }
}
</script>
