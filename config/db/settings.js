// Doc: https://firebase.nuxtjs.org/
module.exports = {
  firestore: {
    enablePersistence: {
      /**
       * Whether to synchronize the in-memory state of multiple tabs. Setting this
       * to 'true' in all open tabs enables shared access to local persistence,
       * shared execution of queries and latency-compensated local document updates
       * across all connected instances.
       *
       * To enable this mode, `synchronizeTabs:true` needs to be set globally in all
       * active tabs. If omitted or set to 'false', `enablePersistence()` will fail
       * in all but the first tab.
       */
      synchronizeTabs: false
    }
  }
}
