<template>
  <div>
    <ThemeModal v-if="selectedTheme" :theme="selectedTheme" />
    <div class="ui-user --display">
      <b-container class="pl-5">
        <b-row class="justify-content-start h-100 w-100">
          <b-col sm="12" align-self="center">
            <span class="ui-size --lg">{{ $t('pickAthemeTitle') + ' ' }}</span>
          </b-col>
          <b-col
            v-for="(theme, i) in themes"
            :key="i"
            md="6"
            class="pt-5 cursor-pointer"
            @click="themeDetail(i)"
          >
            <div class="card mb-4 news-card">
              <div
                class="p-0 border-bottom"
                :style="{
                  background: `url(${theme.images[0].img}) center / 100% 100% no-repeat`,
                  borderColor: 'rgba(0, 0, 0, 0.125)',
                  height: '15rem'
                }"
              ></div>

              <div class="card-body">
                <b-row>
                  <b-col sm="6">
                    <h3 class="card-title">{{ theme.title }}</h3></b-col
                  >
                  <b-col sm="6">
                    <div class="blog-widget-text small-gray text-right">
                      {{ theme.date_created }}
                    </div>
                  </b-col>
                </b-row>
                <div>
                  <p>
                    {{ theme.short_desc.substring(0, 200) }}
                    {{ theme.short_desc.length > 200 ? '...' : '' }}
                  </p>
                </div>
                <!-- <b-button variant="primary">{{ theme.see_demo }}</b-button> -->
                <div class="text-center">
                  <b-button
                    variant="primary"
                    class="center"
                    @click="chooseTheme(i)"
                    >{{ $t('chooseTheme') }}</b-button
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import ThemeData from './data/themes.js'
import ThemeModal from './extra/ThemeModal'
export default {
  components: {
    ThemeModal
  },
  data: () => ({
    themes: ThemeData,
    selectedTheme: null
  }),
  methods: {
    themeDetail(i) {
      // this.$store.commit('dock/chooseTheme', this.themes[i])
      // this.$store.commit('dock/toggle', 'themeModal')
      this.selectedTheme = this.themes[i]
      this.$bvModal.show('theme-modal')
    },
    chooseTheme(i) {
      this.$store.commit('dock/chooseTheme', this.themes[i])
      this.$store.commit('dock/toggle', 'technologies')
    }
  }
}
</script>
