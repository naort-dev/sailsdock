<template>
  <!-- Doc: https://eu.ui-avatars.com/ -->
  <img
    :width="width"
    :height="height"
    :src="
      `https://eu.ui-avatars.com/api/?background=65c5ff&color=fff&name=${$store.state.user.collection.displayName}&size=500`
    "
    class="img-fluid"
  />
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '260'
    },
    height: {
      type: String,
      default: '260'
    }
  }
}
</script>
