export const state = (state) => ({
  collection: null,
  query: ''
})
export const getters = {
  filtered(state) {
    if (state.collection !== null) {
      return state.collection.filter((i) => {
        return i.long_desc.toLowerCase().includes(state.query.toLowerCase())
      })
    }
  },
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
  }
}
export const actions = {}
