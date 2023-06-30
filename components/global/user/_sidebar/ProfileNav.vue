<template>
  <div
    class="pointer hover--theme --bg profile-nav --wrapper"
    @click="$router.push('/settings/overview')"
  >
    <div class="profile-nav --child-1">
      <div class="profile-nav --child-2">
        <span class="profile-nav --icon material-icons w-100 h-100 text-white">
          sentiment_satisfied_alt
        </span>
      </div>
    </div>
    <p
      v-if="$store.state.user.collection.displayName"
      class="text-transform --capitalize profile-nav --profile"
    >
      {{ $store.state.user.collection.displayName.split(' ')[0] }}
    </p>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.profile-nav {
  &.--wrapper {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    align-items: center;
    margin-top: auto;
    height: 40px;
    border: 1px solid rgb(120, 116, 113);
    padding: 5px 20px 5px 5px;
    border-radius: 40px;
    text-decoration: none;
  }
  &.--child-1 {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
  }
  &.--child-2 {
    width: 30px;
    height: 30px;
    background-color: inherit;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }
  &.--profile {
    max-width: 150px;
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 500;
    line-height: 25px;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0px;
    margin-top: 0px;
    padding-bottom: 3px;
    padding-top: 2px;
    text-rendering: geometricprecision;
    text-size-adjust: none;
  }
  &.--icon {
    display: grid;
    align-items: center;
    text-align: center;
  }
}
</style>
