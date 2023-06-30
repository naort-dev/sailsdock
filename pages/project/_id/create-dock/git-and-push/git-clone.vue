<template>
  <div class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <!-- <b-col sm="12" align-self="center">
          <span class="ui-size --lg">{{ $t('addInformation') + ' ' }}</span>
        </b-col> -->
        <b-col v-if="!$store.state.dock.new_dock.bucket" sm="6">
          <b-card class="text-left">
            <b-form class="child-key-right-in w-100">
              <!-- Title -->
              <b-form-group
                id="input-group-dock-title"
                class="pt-2 pb-2"
                :label="$t('giveYourDockAName')"
                label-for="input-dock-title"
              >
                <b-form-input
                  id="input-dock-title"
                  v-model="form.title"
                  :placeholder="$t('dockTitle')"
                  :state="validateState('title')"
                  aria-describedby="dock-title-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="dock-title-feedback">{{
                  error.title
                }}</b-form-invalid-feedback>
              </b-form-group>
              <!-- End -->
              <!-- Description -->
              <b-form-group
                id="input-group-dock-description"
                class="pt-2 pb-2"
                :label="$t('giveYourDockADescription')"
                label-for="input-dock-description"
              >
                <b-form-input
                  id="input-project-description"
                  v-model="form.description"
                  :placeholder="$t('dockDescription')"
                  :state="validateState('description')"
                  aria-describedby="project-description-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="project-description-feedback">{{
                  error.description
                }}</b-form-invalid-feedback>
              </b-form-group>
              <!-- End -->
              <!-- Git URI -->
              <b-form-group
                id="input-group-git-uri"
                class="pt-2 pb-2"
                :label="$t('enterGitUri')"
                label-for="input-dock-description"
              >
                <b-form-input
                  id="input-git-uri"
                  v-model="form.gitUri"
                  :placeholder="$t('gitUriPlaceholder')"
                  :state="validateState('gitUri')"
                  aria-describedby="git-uri-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="git-uri-feedback">{{
                  error.gitUri
                }}</b-form-invalid-feedback>
              </b-form-group>
              <!-- End -->
              <div class="text-center">
                <div class="button --primary --round" @click="checkForm()">
                  <div class="w-100 d-flex text-center justify-content-center">
                    <span class="material-icons align-self-center d-block pr-2">
                      cloud_circle </span
                    >{{ ' ' + $t('upload') }}
                  </div>
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
        <b-col v-if="!$store.state.dock.new_dock.bucket" align-self="center">
          <div class="justify-content-center d-flex">
            <svg
              class="d-block align-self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 1024 1024"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#1B1F23"
              />
            </svg>
          </div>
          <div class="text-center mt-3">
            <div
              class="button --primary --round"
              @click="
                $store.commit('offscreen/toggle', { type: 'library' }),
                  $store.commit('toggleOffscreens')
              "
            >
              <div class="w-100 d-flex text-center justify-content-center">
                <span class="material-icons align-self-center d-block pr-2">
                  local_library </span
                >{{ ' ' + $t('searchLibrary') }}
              </div>
            </div>
          </div>
        </b-col>
        <ClientOnly>
          <b-col v-if="$store.state.dock.new_dock.bucket" sm="6">
            <a target="_blank" :href="$store.state.dock.new_dock.domain">{{
              $store.state.dock.new_dock.domain
            }}</a>
          </b-col>
        </ClientOnly>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'EasyDeploymentAddInformation',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    form: {
      title: null,
      description: null,
      gitUri: null
    },
    error: {
      title: null,
      description: null,
      gitUri: null
    }
  }),
  computed: {
    titleExists() {
      return this.$store.state.dock.collection
        .filter((i) => i.title === this.form.title)
        .map((i) => i.title === this.form.title)[0]
    },
    gitUri() {
      return this.$store.state.githubLibrary.selectedGithubRepository
    }
  },
  watch: {
    gitUri() {
      if (this.$store.state.githubLibrary.selectedGithubRepository !== null) {
        this.form.title = this.gitUri.name
        this.form.description = this.gitUri.description
        this.form.gitUri = this.gitUri.clone_url
      }
    }
  },
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit('page/setPageDesc', this.$t('gitAndPushDeploymentDesc'))
  },
  methods: {
    validateState(title) {
      if (title === 'title') {
        if (this.titleExists) {
          this.error.title =
            this.form.title +
            ' ' +
            this.$t('alreadyExists') +
            '.' +
            ' ' +
            this.$t('createDifferentTitle')
          return false
        } else {
          this.error.title = null
        }
      }
      if (title === 'title') {
        if (this.form.title === '') {
          this.error.title = this.$t('requiredDockTitleError')
          return false
        } else {
          this.error.title = null
        }
      }
      if (title === 'description') {
        if (this.form.description === '') {
          this.error.description = this.$t('requiredDockDescriptionError')
          return false
        } else {
          this.error.description = null
        }
      }
      if (title === 'gitUri') {
        if (this.form.gitUri === '') {
          this.error.gitUri = this.$t('requiredGitUriError')
          return false
        } else {
          this.error.gitUri = null
        }
      }
    },
    checkForm() {
      if (!this.form.title) {
        this.error.title = this.$t('requiredDockTitle')
        this.form.title = ''
      } else {
        this.error.title = null
      }
      if (!this.form.description) {
        this.error.description = this.$t('requiredDockDescription')
        this.form.description = ''
      } else {
        this.error.description = null
      }
      if (!this.form.gitUri) {
        this.error.gitUri = this.$t('requiredGitUri')
        this.form.gitUri = ''
      } else {
        this.error.gitUri = null
      }
      if (
        !this.titleExists &&
        !this.error.title &&
        !this.error.description &&
        !this.error.gitUri
      ) {
        this.next()
      }
    },
    async next() {
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('git', this.form.gitUri)

      const self = this
      this.$store.commit('setGlobalLoader', true)
      console.log('formData', formData, this.form)
      const res = await this.$axios.post('/api/deploy/git-and-push', {
        title: this.form.title,
        git: this.form.gitUri
      })
      self.$store.commit('setGlobalLoader', false)
      console.log(res)

      if (res && !res.data.error) {
        self.$store.commit('dock/put', {
          title: this.form.title,
          description: this.form.description,
          gitUri: this.form.gitUri,
          domain: res.data.domain
        })
        self.$store.dispatch('dock/createDock')
      }
    }
  },
  head() {
    return {
      title: this.$t('gitAndPushDeployment')
    }
  }
}
</script>
