import { vuexfireMutations } from 'vuexfire'
import { getUserFromCookie } from '@/helpers'
export const strict = false
export const state = () => ({
  loader: false,
  nightMode: false,
  offscreens: false
})
export const getters = {
  // Something
}
export const mutations = {
  ...vuexfireMutations,
  setGlobalLoader(state, index) {
    state.loader = index
  },
  nightMode(state, index) {
    state.nightMode = index
    localStorage.setItem('nightMode', JSON.stringify(state.nightMode))
    if (state.nightMode) {
      document.body.style.background = '#282c34'
      document.body.style.color = '#fff'
      document.body.style.transition = '0.3s'
    } else {
      document.body.style.background = '#fff'
      document.body.style.color = 'inherit'
      document.body.style.transition = '0.3s'
    }
  },
  toggleOffscreens(state, index) {
    if (index) {
      state.offscreens = index
    } else {
      state.offscreens = !state.offscreens
    }
  }
}
export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('auth/setAuthenticatedUser', {
        uid: user.user_id,
        email: user.email
      })
    }
  },
  success({ state }, r) {
    this.$toast.success(`<i class="material-icons">error_outline</i>${r}`, {
      duration: 4000,
      position: 'top-right'
    })
  },
  error({ state }, e) {
    this.$toast.error(`<i class="material-icons">error_outline</i>${e}`, {
      duration: 4000,
      position: 'top-right'
    })
  }
}
