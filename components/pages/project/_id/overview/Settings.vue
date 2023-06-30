<template>
  <b-container class="pl-5">
    <b-row class="justify-content-start h-100 w-100">
      <b-col sm="12" class="pt-5 split">
        <b-form class="child-key-right-in w-100">
          <!-- Title -->
          <b-form-group
            id="input-group-project-title"
            class="pt-2 pb-2"
            :label="$t('projectTitle')"
            label-for="input-project-title"
          >
            <b-form-input
              id="input-project-title"
              v-model="form.projectTitle"
              :placeholder="$t('enterName')"
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
            :label="$t('addDescription')"
            label-for="input-project-description"
          >
            <b-form-input
              id="input-project-description"
              v-model="form.projectDescription"
              :placeholder="$t('enterDescription')"
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
            :label="$t('whatsitfor')"
            label-for="project-type-feedback"
          >
            <b-form-select
              id="project-type-feedback"
              v-model="form.projectType"
              :options="options"
              :default="form.projectType"
              aria-describedby="project-type-feedback"
            ></b-form-select>
            <b-form-invalid-feedback id="project-type-feedback">{{
              error.projectType
            }}</b-form-invalid-feedback>
          </b-form-group>
          <b-form-checkbox
            id="checkbox-1"
            v-model="form.isDefault"
            name="checkbox-1"
            value="true"
            class="pt-2 pb-2"
          >
            {{ $t('defaultProject') }}
            <br />
            <small>{{ $t('defaultProjectDescription') }}</small>
          </b-form-checkbox>
          <!-- End -->
          <div class="button --primary" @click="checkForm()">
            <div class="w-100">{{ $t('save') }}</div>
          </div>
        </b-form>
      </b-col>
      <hr />
      <b-col sm="9" class="pt-5">
        <h3>{{ $t('deleteProject') }}</h3>
        <p>{{ $t('deleteProjectDescription') }}</p>
      </b-col>
      <b-col sm="3" class="pt-5">
        <div>
          <div
            class="button --primary"
            :class="{ disabled: form.isDefault === 'true' }"
            @click="deleteProject()"
          >
            <div class="w-100">{{ $t('delete') }}</div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { dataOptions } from '~/data/create/project/new-project.js'
export default {
  name: 'Settings',
  props: ['project'],
  data() {
    return {
      options: [],
      form: {
        id: null,
        projectTitle: null,
        projectDescription: null,
        projectType: null,
        isDefault: false
      },
      error: {
        projectTitle: null,
        projectDescription: null,
        projectType: null
      },
      selected: null
    }
  },
  computed: {
    titleExists() {
      return this.$store.state.project.collection
        .filter(
          (i) =>
            i.projectTitle === this.form.projectTitle && i.id !== this.form.id
        )
        .map((i) => i.projectTitle === this.form.projectTitle)[0]
    }
  },
  mounted() {
    // Make select options translatable
    this.options = dataOptions.map((i) => this.$t(i.text))
    try {
      this.form = { ...this.project }
      if (!this.form) this.form.isDefault = false
      console.log('oldproject', this.project, this.form, this.options)
      // this.form = this.project
      // this.$store.dispatch('project/collection')
      // // Binds it on client-side
      // await this.$store.commit('page/setPageTitle', this.$metaInfo.title)
      // await this.$store.commit(
      //   'page/setPageDesc',
      //   this.$t('newProjectDescription')
      // )
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
        this.saveProject()
      }
    },
    async saveProject() {
      console.log('savedProject', this.form)
      await this.$store.dispatch('project/saveProject', this.form)
    },
    async deleteProject() {
      console.log('savedProject', this.form)
      if (this.form.isDefault !== 'true') {
        await this.$store.dispatch('project/deleteProject', this.form)
      }
    }
  },
  head() {
    return {
      title: this.$t('settings')
    }
  }
}
</script>
<style lang="scss" scoped>
.disabled {
  background: #ddd;
  &:hover {
    background: #ddd;
  }
}
.split {
  padding-bottom: 1rem;
  border-bottom: 1px solid #777;
}
</style>
