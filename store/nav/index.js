export const state = () => ({
  avatar: {
    toggle: {
      menuIsActive: false
    }
  }
})
export const mutations = {
  avatarMenu(state) {
    state.avatar.toggle.menuIsActive = !state.avatar.toggle.menuIsActive
  }
}
