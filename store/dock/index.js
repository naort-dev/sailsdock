/* / By Daniel Hendricks | Tikken, Inc | Tikken AS
/* / Vuex store module for docks
/ */
import { firestoreAction } from 'vuexfire'
export const state = () => ({
  collection: [],
  current_collection: [],
  new_dock: {
    // cms: false,
    // description: 'Angular1',
    // droplet: 'Standard',
    // framework: 'angular',
    // model: 'webapp',
    // process: 'easy',
    // theme: 'Corporate',
    // title: 'Angular3'
  },
  currentProject: {}
})
export const getters = {}
export const mutations = {
  setCurrentProject(state, index) {
    state.currentProject = index
  },
  setCollection(state, index) {
    state.collection = index
  },
  addDock(state, index) {
    state.collection.push(index)
  },
  push(state, index) {
    state.new_dock = { ...state.new_dock, ...index }
  },
  put(state, index) {
    state.new_dock = index
  },
  clear(state) {
    state.new_dock = {}
  },
  addDropletData(state, dock) {
    state.new_dock.dock = dock.dock
    state.new_dock.ssh = dock.ssh
    state.new_dock.privateKey = dock.privateKey
  }
}
export const actions = {
  // Bind the collection
  collection: firestoreAction(function(
    { commit, dispatch, bindFirestoreRef, rootState },
    index
  ) {
    const collection = []
    rootState.project.collection.map(async (i) => {
      const apps = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
        .collection('projects')
        .doc(i.id)
        .collection('apps')
        .where('isActive', '==', true)
        .get()
        .then((snapshot) => {
          // console.log('bind_app1', snapshot.data())
          snapshot.forEach((doc) => {
            try {
              console.log('bind_app', doc.data())
              collection.push(doc.data())
            } catch (e) {
              dispatch('error', e, { root: true })
            }
          })
        })
      await bindFirestoreRef('current_collection', apps, { wait: true })
      console.log('bind_app', apps)
    })
    commit('setCollection', collection)
  }),
  async moveDock({ commit, dispatch, state, rootState }, index) {
    const app = index.app
    app.project_id = index.project_id
    let appRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(app.project_id)
      .collection('apps')
      .doc(app.id)
    await appRef.delete()
    appRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(index.project_id)
      .collection('apps')
      .doc()
    await appRef.set({ ...state.new_dock, isActive: true })
    await this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(index.project_id)
      .collection('apps')
      .where('title', '==', String(app.title))
      .get()
      .then((snapshot) => {
        snapshot.forEach(async (doc) => {
          try {
            await appRef.update({
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
  },
  async sendDock({ commit, dispatch, state, rootState }, index) {
    // create activity in project
    const currentProject =
      rootState.project.collection
        .slice()
        .filter((i) => i.id === state.currentProject.id)[0] || {}
    const activities = (currentProject.activities || []).slice()
    console.log('authinfo', this.$fireAuth.currentUser)
    activities.push({
      title: index.title,
      id: index.id,
      created_at: new Date(),
      created_by: this.$fireAuth.currentUser.email,
      action: 'create'
    })
    const projectRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(currentProject.id)
    await projectRef.update({
      activities
    })
    if (index.application) {
      return await this.$axios
        .$post('/api/space', index)
        .then(async (r) => {
          const userRef = this.$fireStore
            .collection('users')
            .doc(this.$fireAuth.currentUser.uid)
            .collection('projects')
            .doc(state.currentProject.id)
            .collection('apps')
            .doc(index.id)
          await userRef.update({
            isRunning: true,
            bucket: r.bucket,
            domain: r.bucket + '.sailsdock.com'
          })
          const newDock = {
            ...index,
            bucket: r.bucket,
            domain: r.bucket + '.sailsdock.com',
            isRunning: true
          }
          commit('addDock', newDock)
          this.$router.push(
            String(
              `/project/${state.currentProject.id}/dock/${index.id}/overview`
            )
          )
        })
        .catch((e) => {
          dispatch('error', e, { root: true })
        })
    } else {
      return await this.$axios
        .$post('/api/dock', index)
        .then(async (r) => {
          console.log('response', r)
          commit('addDropletData', r)
          const userRef = this.$fireStore
            .collection('users')
            .doc(this.$fireAuth.currentUser.uid)
            .collection('projects')
            .doc(state.currentProject.id)
            .collection('apps')
            .doc(index.id)
          await userRef.update({
            ssh: r.ssh,
            dock: r.droplet,
            privateKey: r.privateKey,
            project_id: state.currentProject.id,
            domain: r.subdomain + '.sailsdock.com',
            isRunning: true
          })
          const newDock = {
            ...index,
            ssh: r.ssh,
            dock: r.droplet,
            privateKey: r.privateKey,
            project_id: state.currentProject.id,
            domain: r.subdomain + '.sailsdock.com',
            isRunning: true
          }
          commit('addDock', newDock)
          let dropletIP
          r.droplet.networks.v4.forEach((eth) => {
            if (eth.type === 'public') {
              dropletIP = eth.ip_address
            }
          })
          this.$router.push(
            String(
              `/project/${state.currentProject.id}/dock/${index.id}/overview`
            )
          )
          return await this.$axios
            .$post('/api/run_dock', {
              dropletIP,
              privateKey: r.privateKey,
              framework: index.framework
            })
            .then((r) => {
              console.log(r)
              commit('clear')
              dispatch(
                'success',
                `The boilerplate has been installed on droplet and also server is up now. You will be able to test ${dropletIP}.`,
                {
                  root: true
                }
              )
            })
            .catch((e) => {
              dispatch('error', e, { root: true })
            })
        })
        .catch((e) => {
          dispatch('error', e, { root: true })
        })
    }
  },
  async createDock({ commit, dispatch, state }) {
    console.log('project1', state.new_dock)
    const userRef = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(state.currentProject.id)
      .collection('apps')
      .doc()
    try {
      await userRef.set({ ...state.new_dock, isActive: true })
      const dockOption = state.new_dock
      console.log('project2', state.new_dock)
      await this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
        .collection('projects')
        .doc(state.currentProject.id)
        .collection('apps')
        .where('title', '==', String(state.new_dock.title))
        .get()
        .then((snapshot) => {
          snapshot.forEach(async (doc) => {
            try {
              await userRef.update({
                id: doc.id
              })
              dockOption.id = doc.id
              console.log(dockOption)
              console.log('project3', state.new_dock)
              if (!state.new_dock.static) {
                dispatch('sendDock', dockOption)
              }
            } catch (e) {
              dispatch('error', e, { root: true })
            }
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
      dispatch('success', 'New Dock has been created successfully.', {
        root: true
      })
    } catch (e) {
      dispatch('error', e, { root: true })
    }
  },
  async fetchDocks({ commit, state }) {
    await this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
      .collection('projects')
      .doc(state.currentProject.id)
      .collection('apps')
      .where('isActive', '==', true)
      .get()
      .then((snapshot) => {
        commit(
          'setDocks',
          snapshot.docs.map((doc) => doc.data())
        )
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
  }
}
