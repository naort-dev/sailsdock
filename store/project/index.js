import { firestoreAction } from 'vuexfire'

export const state = () => ({
  collection: []
})
export const mutations = {
  sortCollection(state, index) {
    state.collection = index
  }
}

export const actions = {
  // Bind the collection
  collection: firestoreAction(async function({ bindFirestoreRef }, index) {
    const ref = await this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .where('isActive', '==', true)
    await bindFirestoreRef('collection', ref, { wait: true })
  }),
  async saveProject({ commit, dispatch, state }, index) {
    // commit('setGlobalLoader', true, { root: true })
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(index.id)
    await userRef.set({
      ...index,
      isActive: true,
      image: `https://eu.ui-avatars.com/api/?background=65c5ff&color=fff&name=${index.projectTitle}&size=500`
    })
    dispatch('success', 'Project Information has been saved successfully.', {
      root: true
    })
  },
  async deleteProject({ commit, dispatch, state, rootState }, index) {
    commit('setGlobalLoader', true, { root: true })
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(index.id)
    console.log('deletedproject', index, rootState.dock.collection)
    const apps = rootState.dock.collection
      .filter((app) => app.project_id === index.id)
      .slice()
    await userRef.delete()

    const defaultProject = state.collection.find(
      (project) => project.isDefault === 'true'
    )
    console.log('defaultproject', defaultProject, state.collection)
    if (defaultProject) {
      apps.map(async (app) => {
        const newApp = app
        newApp.project_id = index.id
        const userRef = this.$fireStore
          .collection('users')
          .doc(this.$fireAuth.currentUser.uid)
          .collection('projects')
          .doc(defaultProject.id)
          .collection('apps')
          .doc()
        await userRef.set({ ...newApp })
        await this.$fireStore
          .collection('users')
          .doc(this.$fireAuth.currentUser.uid)
          .collection('projects')
          .doc(defaultProject.id)
          .collection('apps')
          .where('title', '==', newApp.title)
          .get()
          .then((snapshot) => {
            snapshot.forEach(async (doc) => {
              try {
                await userRef.update({
                  id: doc.id
                })
              } catch (e) {
                dispatch('error', e, { root: true })
              }
            })
          })
          .catch((err) => {
            console.log('Error getting documents', err)
          })
        return newApp
      })
    }
    console.log(apps)
    dispatch('success', 'Project has been deleted successfully.', {
      root: true
    })
    this.$router.push(String(`/dashboard`))
  },
  // Create the collection
  async createCollection({ commit, dispatch, state }, index) {
    commit('setGlobalLoader', true, { root: true })
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc()
    try {
      await userRef.set({
        projectTitle: index.projectTitle,
        projectDescription: index.projectDescription,
        projectType: index.projectType,
        isActive: true,
        image: `https://eu.ui-avatars.com/api/?background=65c5ff&color=fff&name=${index.projectTitle}&size=500`
      })
      await this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
        .collection('projects')
        .where('projectTitle', '==', String(index.projectTitle))
        .get()
        .then((snapshot) => {
          snapshot.forEach(async (doc) => {
            try {
              await userRef.update({
                id: doc.id
              })
            } catch (e) {
              dispatch('error', e, { root: true })
            }
            await dispatch('fetchProjects', { newProject: true, id: doc.id })
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
      // Push user to new project
    } catch (e) {
      dispatch('error', e, { root: true })
    }
  },
  async fetchProjects({ commit, dispatch }, index) {
    await this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .where('isActive', '==', true)
      .get()
      .then((snapshot) => {
        // const projects = snapshot.docs.map((doc) => doc.data())
        // commit('setProjects', projects)
        // If it is a new project, it will push user to its newly
        // created project
        if (index.newProject === true) {
          this.$router.push(`/project/${index.id}/overview`)
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
    setTimeout(() => {
      commit('setGlobalLoader', false, { root: true })
    }, 1000)
  }
}
