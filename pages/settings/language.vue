<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col
          sm="6"
          align-self="center"
          class="text-center text-md-right pr-md-0"
        >
          <section>
            <div
              v-for="(item, i) in languages"
              :key="i"
              class="select-button --wrapper ui-user --border-bottom"
              @click="
                $router.push(switchLocalePath(item.link)),
                  updateUserCollection(item.iso)
              "
            >
              <div class="select-button --icon-left">
                <div v-html="item.flag" />
              </div>
              <div class="select-button --desc">
                {{ $t(item.description) }}
              </div>
              <div
                v-if="item.iso === $store.state.user.collection.language"
                class="select-button --icon-right"
              >
                <i :class="item.iconRight" />
              </div>
            </div>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Language',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null,
    languages: [
      {
        link: 'en',
        flag: '🇺🇸',
        iso: 'EN',
        id: 1,
        description: 'english',
        iconRight: 'icofont-ui-check'
      },
      {
        link: 'es',
        flag: '🇪🇸',
        iso: 'ES',
        id: 2,
        description: 'spanish',
        iconRight: 'icofont-ui-check'
      },
      {
        link: 'no',
        flag: '🇳🇴',
        iso: 'NO',
        id: 3,
        description: 'norwegian',
        iconRight: 'icofont-ui-check'
      }
    ]
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', this.$t('languagePageDescription'))
  },
  methods: {
    async updateUserCollection(language) {
      const userRef = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
      try {
        await userRef.update({
          language
        })
      } catch (e) {
        this.$store.dispatch('error', e, { root: true })
      }
    }
  },
  head() {
    return {
      title: this.$t('language')
    }
  }
}
</script>
