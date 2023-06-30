export const state = () => ({})
export const mutations = {}

export const actions = {
  deployCutAndRun({ state }, file) {
    this.$axios
      .post('/api/deployment/cut-and-run', file)
      .then((res) => console.log('Response: ', res))
      .catch((e) => {
        console.log('error: ', e)
      })
  }
}
