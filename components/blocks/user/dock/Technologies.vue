<template>
  <div>
    <TechnologyModal
      v-if="selectedTechnology"
      :technology="selectedTechnology"
    />
    <div class="ui-user --display">
      <b-container class="pl-5">
        <b-row class="justify-content-start h-100 w-100">
          <b-col sm="12" align-self="center">
            <span class="ui-size --lg">{{ $t('pickAtechTitle') + ' ' }}</span>
          </b-col>
          <b-col
            v-for="(technology, i) in technologies"
            :key="i"
            md="6"
            class="pt-5 cursor-pointer"
            @click="technologyDetail(i)"
          >
            <div class="card mb-4 news-card">
              <div
                class="p-0 border-bottom"
                :style="{
                  background: `url(${technology.images[0].img}) center / 100% 100% no-repeat`,
                  borderColor: 'rgba(0, 0, 0, 0.125)',
                  height: '15rem'
                }"
              ></div>

              <div class="card-body">
                <b-row>
                  <b-col sm="6">
                    <h3 class="card-title">{{ technology.title }}</h3></b-col
                  >
                  <b-col sm="6">
                    <div class="blog-widget-text small-gray text-right">
                      {{ technology.date_created }}
                    </div>
                  </b-col>
                </b-row>
                <div>
                  <p>
                    {{ technology.short_desc.substring(0, 200) }}
                    {{ technology.short_desc.length > 200 ? '...' : '' }}
                  </p>
                </div>
                <!-- <b-button variant="primary">{{ technology.see_demo }}</b-button> -->
                <div class="text-center">
                  <b-button
                    variant="primary"
                    class="center"
                    @click="chooseTechnology(i)"
                    >{{ $t('chooseTechnology') }}</b-button
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
import TechnologyData from './data/technologies.js'
import TechnologyModal from './extra/TechnologyModal'
export default {
  components: {
    TechnologyModal
  },
  data: () => ({
    technologies: TechnologyData,
    selectedTechnology: null
  }),
  methods: {
    technologyDetail(i) {
      // this.$store.commit('dock/chooseTechnology', this.technologies[i])
      // this.$store.commit('dock/toggle', 'technologyModal')
      this.selectedTechnology = this.technologies[i]
      this.$bvModal.show('technology-modal')
    },
    chooseTechnology(i) {
      this.$store.commit('dock/chooseTechnology', this.technologies[i])
      this.$store.commit('dock/toggle', 'droplet')
    }
  }
}
</script>
