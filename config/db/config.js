// Doc: https://firebase.nuxtjs.org/
module.exports = {
  config: {
    production: {
      apiKey: 'AIzaSyBNOmwaGDXmZB6_PDNabb-L1grAXHMc-og',
      authDomain: 'sailsdock-inc.firebaseapp.com',
      databaseURL: 'https://sailsdock-inc.firebaseio.com',
      projectId: 'sailsdock-inc',
      storageBucket: 'sailsdock-inc.appspot.com',
      messagingSenderId: '397332674501',
      appId: '1:397332674501:web:1c800ae8a457d3cca27dac',
      measurementId: 'G-SQST6CC0FH'
    },
    development: {
      apiKey: 'AIzaSyCdd21oYaTlf_HlSNudC3n7_wJM4EjXNEc',
      authDomain: 'sailsdock-dev.firebaseapp.com',
      databaseURL: 'https://sailsdock-dev.firebaseio.com',
      projectId: 'sailsdock-dev',
      storageBucket: 'sailsdock-dev.appspot.com',
      messagingSenderId: '583918749413',
      appId: '1:583918749413:web:5d1b35853b517a10b6760c',
      measurementId: 'G-RBKHLYNF0V'
    }
  },
  customEnv: false,
  onFirebaseHosting: false,
  services: {
    auth: {
      // Experimental Feature, use with caution.
      initialize: {
        onSuccessAction: 'auth/handleSuccessfulAuthentication',
        ssr: true,
        onErrorMutation: null,
        onErrorAction: 'auth/handleAuthError'
      }
    },
    firestore: true,
    functions: {
      location: 'us-central1', // Default
      emulatorPort: 12345
    },
    storage: true,
    realtimeDb: true,
    performance: true,
    analytics: false,
    remoteConfig: {
      settings: {
        fetchTimeoutMillis: 60000, // Default
        minimumFetchIntervalMillis: 43200000 // Default
      },
      defaultConfig: {
        welcome_message: 'Welcome'
      }
    },
    messaging: {
      createServiceWorker: false
    }
  }
}
