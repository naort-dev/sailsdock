// Manage users: https://firebase.google.com/docs/auth/web/manage-users
// Add and manage data: https://firebase.google.com/docs/firestore/manage-data/structure-data
import Cookies from 'js-cookie'
export const state = () => ({
  user: {},
  ref: null,
  toggle: {
    auth: false,
    signin: false,
    create: true,
    recovery: false
  },
  error: {}
})
export const mutations = {
  setAuth(state, settings) {
    state.settings = settings
  },
  toggleAuth(state, toggle) {
    state.toggle.auth = toggle
  },
  toggleToSignIn(state, toggle) {
    state.toggle.signin = toggle
  },
  toggleToCreate(state, toggle) {
    state.toggle.create = toggle
  },
  toggleToRecovery(state, toggle) {
    state.toggle.recovery = toggle
  },
  setAuthenticatedUser(state, { authUser }) {
    state.user = {
      uid: authUser.uid,
      email: authUser.email
    }
  },
  handleAuthError(state, { error }) {
    state.error = error
  },
  addUserRef(state, index) {
    state.ref = index
  },
  resetUser(state) {
    state.user = {}
  }
}
export const actions = {
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Create account --------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async createAccount({ commit, dispatch }, user) {
    commit('addUserRef', { displayName: user.name })
    commit('setGlobalLoader', true, { root: true })
    try {
      await this.$fireAuth
        .createUserWithEmailAndPassword(
          String(user.email),
          String(user.password)
        )
        .then(async (r) => {
          console.log('1.)If the user is successfully registered', r)
          // If the user is successfully registered
          if (r.additionalUserInfo.isNewUser) {
            // Resets the auth modal to show sign in form as default
            // if the user ever logs out
            /* / -------------------------------------- / */
            /* / ---------- Set data collection ------- / */
            /* / -------------------------------------- / */
            await dispatch('setUserRef', {
              resFromFirebase: r.user,
              reqFromLocal: user
            })
            /* / -------------------------------------- / */
            /* / ---------------- End ----------------- / */
            /* / -------------------------------------- / */
            const actionCodeSettings = {
              // URL you want to redirect back to. The domain (www.example.com) for this
              // URL must be whitelisted in the Firebase Console.
              url: 'https://tikken.com', // TODO => Setup and change to process.env.APP_DOMAIN
              // This must be true.
              handleCodeInApp: true
            }
            // Sends activation email to user
            this.$fireAuth
              .sendSignInLinkToEmail(user.email, actionCodeSettings)
              .then((r) => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                console.log('state user', state.ref)
                this.$toast.success(
                  `<div class="notification-inside"><i class="material-icons">done</i>Welcome onboard ${user.name}</div>`,
                  {
                    duration: 4000
                  }
                )
              })
              .catch(function(e) {
                dispatch('error', e, { root: true })
              })
            // Register the user with stripe
            // Todo: Remove and have customer register with stripe later | ?
            /* dispatch(
              'stripe/createCustomer',
              {
                name: user.name,
                email: user.email,
                uid: this.$fireAuth.currentUser.uid,
                description: 'Sailsdock.com'
              },
              { root: true }
            ) */
          }
        })
    } catch (e) {
      // If there's any error, the loader disables
      commit('setGlobalLoader', false, { root: true })
      // Submits console response on error to notification
      // Todo -> internationalize the English response
      dispatch('error', e.message, { root: true })
    }
    // If user is authenticated, push to dashboard
    setTimeout(() => {
      if (this.$fireAuth.currentUser.uid) {
        this.$router.push('/dashboard')
        commit('setGlobalLoader', false, { root: true })
      }
    }, 500)
    // Disable the loader
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Set user data ---------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async setUserRef({ dispatch, rootState }, user) {
    console.log('2.)Set user data', user)
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
    const osVersion = this.$ua.osVersion()
    const browser = this.$ua.browser()
    const browserVersion = this.$ua.browserVersion()
    const browserVendor = this.$ua.browserVendor()
    const isFromIphone = this.$ua.isFromIphone()
    const isFromIpad = this.$ua.isFromIpad()
    const isFromIpod = this.$ua.isFromIpod()
    const isFromIos = this.$ua.isFromIos()
    const isFromAndroidMobile = this.$ua.isFromAndroidMobile()
    const isFromAndroidTablet = this.$ua.isFromAndroidTablet()
    const isFromAndroidOs = this.$ua.isFromAndroidOs()
    const isFromWindowsPhone = this.$ua.isFromWindowsPhone()
    const isFromSmartphone = this.$ua.isFromSmartphone()
    const isFromAppliance = this.$ua.isFromAppliance()
    const isFromCrawler = this.$ua.isFromCrawler()
    const isFromTablet = this.$ua.isFromTablet()
    try {
      await userRef.set({
        uid: user.resFromFirebase.uid,
        displayName: user.reqFromLocal.name,
        email: user.resFromFirebase.email,
        emailVerified: user.resFromFirebase.emailVerified,
        phoneNumber: user.resFromFirebase.phoneNumber,
        hasOrders: false,
        orders: [],
        subscriptions: [],
        newUser: true,
        hasBoarded: false,
        isNewUser: true,
        providerId: null,
        marketing: {
          newsletter: true
        },
        tos: true,
        address: {
          city: null,
          country: null,
          line1: null,
          line2: null,
          postal_code: null,
          state: null
        },
        metadata: {
          lastSignInTime: user.resFromFirebase.metadata.lastSignInTime,
          creationTime: user.resFromFirebase.metadata.creationTime
        },
        osVersion,
        browser,
        browserVersion,
        browserVendor,
        isFromIphone,
        isFromIpad,
        isFromIpod,
        isFromIos,
        isFromAndroidMobile,
        isFromAndroidTablet,
        isFromAndroidOs,
        isFromWindowsPhone,
        isFromSmartphone,
        isFromAppliance,
        isFromCrawler,
        isFromTablet
      })
    } catch (e) {
      dispatch('error', e, { root: true })
    }
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Handle auth ------------------------------------------ / */
  /* / --------------------------------------------------------------------------------------------- / */
  async handleSuccessfulAuthentication({ commit, dispatch }, { authUser }) {
    if (authUser) {
      commit('setGlobalLoader', true, { root: true })
      await commit('setAuthenticatedUser', { authUser })
      const token = await this.$fireAuth.currentUser.getIdToken(true)
      Cookies.set('access_token', token)
      const userRef = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
      const getUserRef = await userRef.get()
      // Set ref in state every time auth happens
      commit('addUserRef', getUserRef.data())
      setTimeout(() => {
        if (this.$fireAuth.currentUser.uid) {
          this.$router.push('/dashboard')
        }
      }, 500)
      commit('setGlobalLoader', false, { root: true })
    }
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Handle error ----------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  handleAuthError({ commit }, e) {
    commit('handleAuthError', e)
  },
  setAuthenticatedUser({ commit }, authUser) {
    commit('setAuthenticatedUser', { authUser })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Sign in ---------------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async signInUser({ commit, dispatch }, auth) {
    commit('setGlobalLoader', true, { root: true })
    try {
      await this.$fireAuth.signInWithEmailAndPassword(auth.email, auth.password)
    } catch (e) {
      // dispatch('error', e, { root: true })
      commit('setGlobalLoader', false, { root: true })
    }
    commit('setGlobalLoader', true, { root: false })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Reset password --------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async resetPasswordWithEmail({ commit }, { email }) {
    await this.$fireAuth
      .sendPasswordResetEmail(email)
      .then((r) => commit('setCurrentUser', null))
      .catch((e) => {})
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Refresh local user state ----------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async refreshUserRef({ commit, state }) {
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
    const getUserRef = await userRef.get()
    const userDocRef = await getUserRef.data()
    commit('addUserRef', userDocRef)
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Send activation link --------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */

  sendSignInLinkToEmail({ rootState, dispatch }) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3000/verify-email',
      // This must be true.
      handleCodeInApp: true
      // dynamicLinkDomain: 'https://sailsdock.com'
    }
    this.$fireAuth
      .sendSignInLinkToEmail(
        rootState.user.collection.email,
        actionCodeSettings
      )
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', rootState.user.email)
      })
      .catch(function(e) {
        dispatch('error', e, { root: true })
      })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------------- Log out ---------------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async logoutUser({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut()
      this.$router.push('/')
    } catch (e) {
      dispatch('error', e)
    } finally {
      this.$toast.show(
        `<div class="notification-inside"><i class="material-icons cl-sizzling-red">favorite_border</i>Adieu, see you soon!</div>`,
        {
          position: 'top-right',
          theme: 'toasted-primary',
          duration: 4000
        }
      )
      commit('resetUser')
    }
  },
  async deleteUser({ dispatch, commit }) {
    try {
      // Delete user
      await this.$fireAuth.currentUser
        .delete()
        .then(function() {
          // User is deleted
        })
        .catch(function(e) {
          dispatch('error', e, { root: true })
        })
      this.$router.push('/')
    } catch (e) {
      dispatch('error', e, { root: true })
    } finally {
      this.$toast.show(
        `<div class="notification-inside"><i class="material-icons cl-sizzling-red">favorite_border</i>Adieu, we hope you'll be back!</div>`,
        {
          position: 'top-right',
          theme: 'toasted-primary',
          duration: 4000
        }
      )
      commit('resetUser')
    }
  }
}
