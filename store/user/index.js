import { firestoreAction } from 'vuexfire'

export const state = () => ({
  collection: []
})
export const getters = {
  collection: (state) => state.collection
}
export const mutations = {}
export const actions = {
  collection: firestoreAction(async function({ bindFirestoreRef }, index) {
    const ref = await this.$fireStore
      .collection('users')
      .doc(String(this.$fireAuth.currentUser.uid))
    await bindFirestoreRef('collection', ref, { wait: true })
  })
}
