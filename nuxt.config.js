export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        as: 'style',
        href: './static/font/stylesheet.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#64c6ff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/scss/_master.scss',
    './static/font/stylesheet.css',
    './static/icofont/icofont.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/guide/plugins/
   */
  plugins: [
    '~/plugins/index',
    { src: '~/plugins/draggable/index.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/anteriovieira/nuxt-material-design-icons
    'nuxt-material-design-icons-iconfont',
    // Doc: https://github.com/fukuiretu/nuxt-user-agent
    'nuxt-user-agent',
    // Doc : https://github.com/nuxt-community/nuxt-i18n
    ['nuxt-i18n', require('./config/i18n')],
    // Doc: https://firebase.nuxtjs.org/
    ['@nuxtjs/firebase', require('./config/db/config')],
    // Doc: https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    // Doc: https://www.npmjs.com/package/nuxt-vuex-localstorage
    [
      'nuxt-vuex-localstorage',
      {
        mode: 'debug',
        localStorage: ['auth', 'user', 'project', 'dock', 'page', 'nav'] //  If not entered, “localStorage” is the default value
        // sessionStorage: ['sfoo', 'sbar'] //  If not entered, “sessionStorage” is the default value
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['nuxt-vuex-localstorage'],
    vendor: ['axios'],
    extend(config, ctx) {}
  },
  serverMiddleware: ['~/api/index.js']
}
