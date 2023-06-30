<template>
  <div class="ui-user --display">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <b-col sm="12" align-self="center">
          <span class="ui-size --lg">{{ $t('createDock') + ' ' }}</span>
        </b-col>
        <b-col sm="6" class="pt-5">
          <b-form class="child-key-right-in w-100">
            <!-- Title -->
            <b-form-group id="input-group-dock-title" class="pt-2 pb-2">
              <b-form-input
                id="input-dock-title"
                v-model="form.dockTitle"
                :placeholder="$t('dockTitle')"
                :state="validateState('dockTitle')"
                aria-describedby="dock-title-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="dock-title-feedback">{{
                error.dockTitle
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
            <!-- Description -->
            <b-form-group id="input-group-dock-description" class="pt-2 pb-2">
              <b-form-input
                id="input-dock-description"
                v-model="form.dockDescription"
                :placeholder="$t('dockDescription')"
                :state="validateState('dockDescription')"
                aria-describedby="dock-description-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="dock-description-feedback">{{
                error.dockDescription
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
            <div class="button --primary" @click="checkForm()">
              <div class="w-100">{{ $t('pickAtheme') }}</div>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      dockTitle: null,
      dockDescription: null,
      parentId: null
    },
    error: {
      dockTitle: null,
      dockDescription: null
    },
    selected: null,
    options: [
      { value: null, text: 'Please select a project type' },
      {
        value: {
          type: 'webapp',
          icon: 'icofont-ui-touch-phone'
        },
        text: 'Web Application'
      },
      {
        value: {
          type: 'ecommerce',
          icon: 'icofont-ui-cart'
        },
        text: 'eCommerce Apllication'
      },
      {
        value: {
          type: 'saas',
          icon: 'icofont-ui-tag'
        },
        text: 'SaaS Application'
      }
    ]
  }),
  computed: {
    titleExists() {
      return this.$store.state.dock.create.index
        .filter((i) => i.dockTitle === this.form.dockTitle)
        .map((i) => i.dockTitle === this.form.dockTitle)[0]
    }
  },
  methods: {
    validateState(title) {
      if (title === 'dockTitle') {
        if (this.titleExists) {
          this.error.dockTitle =
            this.form.dockTitle +
            ' ' +
            this.$t('alreadyExists') +
            '.' +
            ' ' +
            this.$t('createDifferentTitle')
          return false
        } else {
          this.error.dockTitle = null
        }
      }
      if (title === 'dockTitle') {
        if (this.form.dockTitle === '') {
          this.error.dockTitle = this.$t('requiredDockTitleError')
          return false
        } else {
          this.error.dockTitle = null
        }
      }
      if (title === 'dockDescription') {
        if (this.form.dockDescription === '') {
          this.error.dockDescription = this.$t('requiredDockDescriptionError')
          return false
        } else {
          this.error.dockDescription = null
        }
      }
    },
    checkForm() {
      if (!this.form.dockTitle) {
        this.error.dockTitle = this.$t('requiredDockTitleError')
        this.form.dockTitle = ''
      } else {
        this.error.dockTitle = null
      }
      if (!this.form.dockDescription) {
        this.error.dockDescription = this.$t('requireddockDescriptionError')
        this.form.dockDescription = ''
      } else {
        this.error.dockDescription = null
      }
      if (
        !this.titleExists &&
        !this.error.dockTitle &&
        !this.error.dockDescription
      ) {
        this.next()
      }
    },
    async next() {
      this.form.parentId = this.$route.params.id
      await this.$store.commit('dock/create', this.form)
      this.$store.commit('dock/toggle', 'themes')
    }
  }
}
</script>
