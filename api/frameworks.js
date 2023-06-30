export const FRAMEWORKS_SPECS = {
  React: {
    output: 'build'
  },
  Angular: {
    output: 'dist',
    preInstall: `
        npm config set user 0
        npm config set unsafe-perm true
        echo n | npm install -g --silent @angular/cli@7.3.10
    `
  },
  Ember: {
    output: 'dist',
    preInstall: 'npm install -g ember-cli'
  },
  Gatsby: {
    output: 'public'
  },
  Hugo: {
    output: 'dist',
    preInstall: 'sudo apt-get install hugo'
  },
  Next: {
    serve: 'npm -- start'
  },
  Nuxt: {
    serve: 'npm -- start'
  },
  Sapper: {
    serve: 'node __sapper__/build'
  },
  Svelte: {
    output: 'public'
  },
  Vue: {
    output: 'dist'
  }
}

export const FRAMEWORKS = {
  ng: 'Angular',
  ember: 'Ember',
  hugo: 'Hugo',
  'vue-cli-service': 'Vue',
  gatsby: 'Gatsby',
  sapper: 'Sapper',
  rollup: 'Svelte',
  next: 'Next',
  nuxt: 'Nuxt',
  react: 'React'
}
