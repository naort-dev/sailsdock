// https://github.com/nuxt-community/nuxt-i18n
module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: require('../../locales/en.json'),
      es: require('../../locales/es.json')
    }
  }
}
