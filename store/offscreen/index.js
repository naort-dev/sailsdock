export const state = () => ({
  toggle: {
    githubLibrary: false
  }
})
export const mutations = {
  toggle(state, index) {
    if (index.type === 'library') {
      state.toggle.githubLibrary = !state.toggle.githubLibrary
    } else {
      state.toggle.githubLibrary = false
    }
  }
}

export const actions = {}
