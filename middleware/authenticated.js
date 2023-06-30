export default function({ isBrowser, store, redirect }) {
  if (!store.state.auth.user.uid) {
    return redirect('/')
  }
}
