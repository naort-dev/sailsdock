<template>
  <div class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <!-- <b-col sm="12" align-self="center">
          <span class="ui-size --lg">{{ $t('addInformation') + ' ' }}</span>
        </b-col> -->
        <b-col sm="6">
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
              <div class="button --primary --round" @click="checkForm()">
                <div class="w-100">
                  <i class="icofont-ui-add" />{{ ' ' + $t('add') }}
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
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
      description: null
    },
    error: {
      title: null,
      description: null
    }
  }),
  computed: {
    titleExists() {
      return this.$store.state.dock.collection
        .filter((i) => i.title === this.form.title)
        .map((i) => i.title === this.form.title)[0]
    }
  },
  mounted() {
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    // Send the welcome message
    /* this.$store.commit(
      'page/setPageDesc',
      this.$t('addDockAppInformationPageDescription')
    ) */
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
      if (!this.titleExists && !this.error.title && !this.error.description) {
        this.next()
      }
    },
    next() {
      this.$router.push(
        String(
          `/project/${this.$route.params.id}/create-dock/hand-over-fist/submit`
        )
      )
      this.$store.commit('dock/push', this.form)
      // this.form.parentId = this.$route.params.id
      // await this.$store.commit('dock/commitNewDock', this.form)
    }
  },
  head() {
    return {
      title: this.$t('addDockAppInformation')
    }
  }
}
</script>
