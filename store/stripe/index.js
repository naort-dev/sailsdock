export const state = () => ({
  public: {
    public_key: null
  },
  private: {
    secret_key: null
  },
  subscription_id: null,
  card: {
    id: null,
    style: {
      base: {
        color: '#000',
        'border-bottom': '2px solid black;',
        fontFamily: 'inherit',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#000'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  }
})
export const mutations = {
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Set the public stripe key  --------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  setPublicKey(state, index) {
    state.public.public_key = index
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Set the secret stripe key  --------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  setSecretKey(state, index) {
    state.private.secret_key = index
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Set the subscription ID  ----------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  setSubscriptionId(state, index) {
    state.subscription_id = index
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Set the subscription ID  ----------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  setCardId(state, index) {
    state.card.id = index
  }
}
export const actions = {
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Get public key  -------------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async getStripeKey({ commit, dispatch }) {
    await this.$axios
      .$get('/api/stripe/environment')
      .then((r) => {
        commit('setPublicKey', r.stripePublicKey)
      })
      .catch((e) => {
        dispatch('error', e, { root: true })
      })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Get secret key  -------------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async getStripeSecret({ commit, dispatch }) {
    await this.$axios
      .$get('/api/stripe/environment/secret')
      .then((r) => {
        commit('setSecretKey', r.stripeSecretKey)
      })
      .catch((e) => {
        dispatch('error', e, { root: true })
      })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Setup intents  ------------------------------------ / */
  /* / --------------------------------------------------------------------------------------------- / */
  setupIntent({ commit, dispatch, state }, index) {
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      this.$axios.$post('/api/stripe/setup-intents/create', index).then(
        (response) => {
          // http success, call the mutator and change something in state
          resolve(response) // Let the calling function know that http is done. You may send some data back
        },
        (error) => {
          // http failed, let the calling function know that action did not work out
          reject(error)
        }
      )
    })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Confirm intents  ------------------------------------ / */
  /* / --------------------------------------------------------------------------------------------- / */
  confirmSetupIntent({ commit, dispatch, state }, index) {
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      this.$axios.$post('/api/stripe/setup-intents/confirm', index).then(
        (response) => {
          // http success, call the mutator and change something in state
          resolve(response) // Let the calling function know that http is done. You may send some data back
        },
        (error) => {
          // http failed, let the calling function know that action did not work out
          reject(error)
        }
      )
    })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Attach payment  -------------------------------------------- / */
  /* / --------------------------------------------------------------------------------------------- / */
  async updatePayment({ commit, dispatch, rootState }, index) {
    // Posts the card token to firebase
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
    // Posts the payment
    await this.$axios
      .$post('/api/stripe/update/payment', index)
      .then(async (r) => {
        await dispatch('auth/refreshUserRef', null, { root: true })
        try {
          userRef.update({
            stripe: {
              customer_id: rootState.auth.user.stripe.customer_id,
              card: r.id
            }
          })
        } catch (e) {
          dispatch('error', e, { root: true })
        }
      })
      .catch((e) => {
        dispatch('error', e, { root: true })
      })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Create stripe subscription  ------------------------------------ / */
  /* / --------------------------------------------------------------------------------------------- / */
  createSubscription({ commit, dispatch, state }, index) {
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      this.$axios.$post('/api/stripe/subscriptions/create', index).then(
        (response) => {
          // http success, call the mutator and change something in state
          resolve(response) // Let the calling function know that http is done. You may send some data back
        },
        (error) => {
          // http failed, let the calling function know that action did not work out
          reject(error)
        }
      )
    })
  },
  /* / --------------------------------------------------------------------------------------------- / */
  /* / -------------------------------- Create stripe customer  ------------------------------------ / */
  /* / --------------------------------------------------------------------------------------------- / */
  async createCustomer({ commit, dispatch }, index) {
    await this.$axios
      .$post('/api/stripe/create/customer', index)
      .then((r) => {
        const userRef = this.$fireStore
          .collection('users')
          .doc(this.$fireAuth.currentUser.uid)
        try {
          userRef.update({
            stripe: {
              customer_id: r.id,
              card: null
            }
          })
        } catch (e) {
          dispatch('error', e, { root: true })
        }
      })
      .catch((e) => {
        dispatch('error', e, { root: true })
      })
  }
}
