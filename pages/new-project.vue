<template>
  <div v-if="$store.state.page.title" class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <!-- <b-col sm="12" align-self="center">
          <span class="ui-size --lg">{{ $t('startProject') + ' ' }}</span>
        </b-col> -->
        <b-col sm="6" class="pt-5">
          <b-form class="child-key-right-in w-100">
            <!-- Title -->
            <b-form-group
              id="input-group-project-title"
              class="pt-2 pb-2"
              :label="$t('giveYourProjectAName')"
              label-for="input-project-title"
            >
              <b-form-input
                id="input-project-title"
                v-model="form.projectTitle"
                :placeholder="$t('projectTitle')"
                :state="validateState('projectTitle')"
                aria-describedby="project-title-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="project-title-feedback">{{
                error.projectTitle
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
            <!-- Description -->
            <b-form-group
              id="input-group-project-description"
              class="pt-2 pb-2"
              :label="$t('projectDescription')"
              label-for="input-project-description"
            >
              <b-form-input
                id="input-project-description"
                v-model="form.projectDescription"
                :placeholder="$t('projectDescription')"
                :state="validateState('projectDescription')"
                aria-describedby="project-description-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="project-description-feedback">{{
                error.projectDescription
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
            <!-- Model -->
            <b-form-group
              id="input-group-project-type"
              class="pt-2 pb-2"
              :label="$t('whatIsTheProjectFor')"
              label-for="project-type-feedback"
            >
              <b-form-select
                id="project-type-feedback"
                v-model="form.projectType"
                :options="options"
                aria-describedby="project-type-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="project-type-feedback">{{
                error.projectType
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
            <div class="button --primary" @click="checkForm()">
              <div class="w-100">{{ $t('createProject') }}</div>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { dataOptions } from '~/data/create/project/new-project.js'
export default {
  name: 'NewProject',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    options: [],
    form: {
      projectTitle: null,
      projectDescription: null,
      projectType: null
    },
    error: {
      projectTitle: null,
      projectDescription: null,
      projectType: null
    },
    selected: null
  }),
  computed: {
    titleExists() {
      return this.$store.state.project.collection
        .filter((i) => i.projectTitle === this.form.projectTitle)
        .map((i) => i.projectTitle === this.form.projectTitle)[0]
    }
  },
  async mounted() {
    // Make select options translatable
    this.options = dataOptions.map((i) => this.$t(i.text))
    try {
      this.$store.dispatch('project/collection')
      // Binds it on client-side
      await this.$store.commit('page/setPageTitle', this.$metaInfo.title)
      await this.$store.commit(
        'page/setPageDesc',
        this.$t('newProjectDescription')
      )
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    validateState(title) {
      if (title === 'projectTitle') {
        if (this.titleExists) {
          this.error.projectTitle =
            this.form.projectTitle +
            ' ' +
            this.$t('alreadyExists') +
            '.' +
            ' ' +
            this.$t('createDifferentTitle')
          return false
        } else {
          this.error.projectTitle = null
        }
      }
      if (title === 'projectTitle') {
        if (this.form.projectTitle === '') {
          this.error.projectTitle = this.$t('requiredProjectTitleError')
          return false
        } else {
          this.error.projectTitle = null
        }
      }
      if (title === 'projectDescription') {
        if (this.form.projectDescription === '') {
          this.error.projectDescription = this.$t(
            'requiredProjectDescriptionError'
          )
          return false
        } else {
          this.error.projectDescription = null
        }
      }
      if (title === 'projectType') {
        if (this.form.projectType === '') {
          this.error.projectType = this.$t('requiredProjectTypeError')
          return false
        } else {
          this.error.projectType = null
        }
      }
    },
    checkForm() {
      if (!this.form.projectTitle) {
        this.error.projectTitle = this.$t('requiredProjectTitleError')
        this.form.projectTitle = ''
      } else {
        this.error.projectTitle = null
      }
      if (!this.form.projectDescription) {
        this.error.projectDescription = this.$t(
          'requiredProjectDescriptionError'
        )
        this.form.projectDescription = ''
      } else {
        this.error.projectDescription = null
      }
      if (!this.form.projectType) {
        this.error.projectType = this.$t('requiredProjectTypeError')
        this.form.projectType = ''
      } else {
        this.error.projectType = null
      }
      if (
        !this.titleExists &&
        !this.error.projectTitle &&
        !this.error.projectDescription &&
        !this.error.projectType
      ) {
        this.createProject()
      }
    },
    async createProject() {
      await this.$store.dispatch('project/createCollection', this.form)
    }
  },
  head() {
    return {
      title: this.$t('newProject')
    }
  }
}
</script>
