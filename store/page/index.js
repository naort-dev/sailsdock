export const state = () => ({
  title: null,
  desc: null
})
export const getters = {}
export const mutations = {
  // ...vuexfireMutations,
  setPageTitle(state, index) {
    state.title = index
  },
  setPageDesc(state, index) {
    state.desc = index
  }
}
