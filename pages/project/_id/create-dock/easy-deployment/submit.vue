<template>
  <div v-if="$store.state.page.title" class="ui-user --display easy-process">
    <Modal
      v-if="selectedModal"
      :id="'modal'"
      :data="selectedModal"
      :add="add"
    />
    <b-container class="pl-5">
      <b-card :header="$t('Type of application')" class="text-center">
        <b-row class="justify-content-end h-100 w-100">
          <b-col
            v-for="(content, i) in applications"
            :key="i"
            sm="12"
            md="6"
            align-self="center"
            class="pr-md-0 mb-2"
            @click="selectCard(content, 'application')"
          >
            <b-card
              class="text-left"
              :class="{ active: dock.application === content.id }"
            >
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.short_description) }}</p>
              <div class="mt-4 mb-4 pointer" @click="modalFunction(content)">
                <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container class="pl-5">
      <b-card
        :header="
          `${$t('Type of framework')} ${
            dock.framework ? ' - ' + dock.framework : ''
          }`
        "
        class="text-center"
      >
        <b-row class="justify-content-end h-100 w-100">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              v-for="(content, i) in frameworks"
              :key="i"
              :img-src="content.images[0].img"
              @click="selectCard(content, 'framework')"
            >
              <b-card
                v-if="
                  $store.state.dock.new_dock.model !== 'spa' ||
                    ($store.state.dock.new_dock.model === 'spa' && content.spa)
                "
                class="carousel-card"
              >
                <p>{{ $t(content.short_description) }}</p>
                <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
                  <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
                </div>
                <div
                  class="button --primary --block --round"
                  @click="selectCard(content, 'framework')"
                >
                  <div class="w-100">
                    <i class="icofont-ui-add" />{{ ' ' + $t('add') }}
                  </div>
                </div>
              </b-card>
            </b-carousel-slide>
          </b-carousel>
        </b-row>
      </b-card>
    </b-container>
    <b-container class="pl-5">
      <b-card :header="$t('Models')" class="text-center">
        <b-row class="justify-content-end h-100 w-100">
          <b-col
            v-for="(content, i) in models"
            :key="i"
            sm="12"
            md="4"
            align-self="center"
            class="pr-md-0 mb-2"
            @click="selectCard(content, 'model')"
          >
            <b-card
              class="text-left"
              :class="{ active: dock.model === content.id }"
            >
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.description.short) }}</p>
              <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
                <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container class="pl-5">
      <b-card :header="$t('Content management system')" class="text-center">
        <b-row class="justify-content-end h-100 w-100">
          <b-col
            v-for="(content, i) in cms"
            :key="i"
            sm="12"
            md="6"
            align-self="center"
            class="pr-md-0 mb-2"
            @click="selectCard(content, 'cms')"
          >
            <b-card
              class="text-left"
              :class="{ active: dock.cms === content.id }"
            >
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.short_description) }}</p>
              <div class="mt-4 mb-4 pointer" @click="modalFunction(content)">
                <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container class="pl-5">
      <b-card :header="$t('UI Themes')" class="text-center">
        <b-row class="justify-content-end h-100 w-100">
          <b-col
            v-for="(content, i) in themes"
            :key="i"
            sm="12"
            md="6"
            align-self="center"
            class="pr-md-0 mb-2"
            @click="selectCard(content, 'theme')"
          >
            <b-card
              class="text-left"
              :class="{ active: dock.theme === content.id }"
            >
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.short_description) }}</p>
              <div class="mt-4 mb-4 pointer" @click="modalFunction(content)">
                <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container v-if="!dock.application" class="pl-5">
      <b-card :header="$t('Droplets')" class="text-center">
        <b-row class="justify-content-end h-100 w-100">
          <b-col
            v-for="(content, i) in droplets"
            :key="i"
            sm="12"
            md="6"
            align-self="center"
            class="pr-md-0 mb-2"
            @click="selectCard(content, 'droplet')"
          >
            <b-card
              class="text-left"
              :class="{ active: dock.droplet === content.id }"
            >
              <h3>{{ $t(content.title) }}</h3>
              <p>{{ $t(content.short_description) }}</p>
              <div class="mt-4 mb-4 pointer" @click="modalFunction(content)">
                <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container class="pl-5">
      <div class="button --primary --block --round" @click="submit()">
        <div class="w-100">{{ $t('Submit') }}</div>
      </div>
    </b-container>
  </div>
</template>

<script>
import cmsData from '~/data/create/dock/add-cms.js'
import modelsData from '~/data/create/dock/add-model.js'
import frameworksData from '~/data/create/dock/add-framework.js'
import dropletData from '~/data/create/dock/add-droplets.js'
import themeData from '~/data/create/dock/add-themes.js'
import Modal from '~/components/blocks/app/props/Modal.vue'
export default {
  name: 'AddCms',
  layout: 'protected',
  middleware: 'authenticated',
  components: {
    Modal
  },
  data: () => ({
    slide: 0,
    sliding: null,
    applications: [
      {
        id: true,
        title: 'SPA',
        short_description: 'Single Page Application',
        long_desc: 'Long description'
      },
      {
        id: false,
        title: 'SSR',
        short_description: 'Server Side Rendering',
        long_desc: 'Long description'
      }
    ],
    cms: cmsData,
    droplets: dropletData,
    frameworks: frameworksData,
    models: modelsData,
    themes: themeData,
    dynamicGreeting: null,
    structuredDescription: null,
    selectedModal: null,
    dock: {}
  }),
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    this.dock = this.$store.state.dock.new_dock
    // Page Description
    // Send the welcome message
    // this.$store.commit('page/setPageDesc', this.$t('cmsPageDescription'))
  },
  methods: {
    add(index) {
      this.$store.commit('dock/push', { cms: index.cms })
      this.$router.push(
        String(
          `/project/${this.$route.params.id}/create-dock/easy-deployment/add-model`
        )
      )
    },
    selectCard(content, key) {
      console.log(content, key)
      this.dock[key] = content.id
      if (key === 'application') {
        this.frameworks = frameworksData.filter(
          (item) => item.spa === content.id
        )
      }
      console.log(this.dock)
    },
    modalFunction(content) {
      this.selectedModal = content
      this.$bvModal.show('modal')
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async submit() {
      console.log('sdddddddddddddd', this.dock)
      await this.$store.commit('dock/push', this.dock)
      this.$store.dispatch('dock/createDock')
    }
  },
  head() {
    return {
      title: this.$t('Easy Process')
    }
  }
}
</script>
