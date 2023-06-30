export const state = () => ({
  collection: null,
  query: '',
  selectedGithubRepository: {}
})
export const getters = {
  searchQuery(state) {
    return state.query
  }
}
export const mutations = {
  addSearchableCollection(state, index) {
    state.collection = index
  },
  updateSearchQuery(state, query) {
    state.query = String(query)
  },
  addGithubRepositoryUri(state, index) {
    state.selectedGithubRepository = index
  }
}
export const actions = {}
