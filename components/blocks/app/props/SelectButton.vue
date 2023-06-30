<template>
  <section>
    <div
      v-for="(item, i) in items"
      :key="i"
      class="select-button --wrapper ui-user --border-bottom"
      @click="$router.push(item.link)"
    >
      <div class="select-button --icon-left">
        <i :class="item.iconLeft" style="font-weight: 600 !important;" />
      </div>
      <div class="select-button --desc">
        {{ $t(item.description) }}
      </div>
      <div class="select-button --icon-right">
        <span class="material-icons" style="font-weight: 600 !important;">
          {{ item.iconRight }}
        </span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  }
}
</script>
