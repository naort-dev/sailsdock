<template>
  <div class="ui-user --display pb-5">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-100">
        <!-- <b-col sm="12" align-self="center">
            <span class="ui-size --lg">{{ $t('addInformation') + ' ' }}</span>
          </b-col> -->
        <b-col v-if="!$store.state.dock.new_dock.bucket" sm="6">
          <b-card class="text-left">
            <b-form
              class="child-key-right-in w-100"
              enctype="multipart/form-data"
            >
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
              <b-form-group label="Deploy to" class="pt-2 pb-2">
                <b-form-radio-group
                  id="radio-group-2"
                  v-model="form.source"
                  name="radio-sub-component"
                >
                  <b-form-radio value="do">DigitalOcean Space</b-form-radio>
                  <b-form-radio value="aws">AWS S3</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
              <!-- End -->
              <!-- Drop zone -->
              <input
                id="file"
                ref="file"
                type="file"
                style="display: none"
                accept=".zip"
                @change="handleFileUpload"
              />
              <div
                v-if="file === ''"
                v-cloak
                id="drop-area"
                v-b-tooltip.hover.right="$t('supportOnlyForZip')"
                class="ui-cloud-upload --wrapper d-flex justify-content-center pointer"
                @drop.prevent="handleFileUpload"
                @dragover.prevent
                @click="$refs.file.click(handleFileUpload)"
              >
                <div class="d-block align-self-center">
                  <span
                    v-if="!file"
                    class="material-icons ui-cloud-upload --cloud"
                  >
                    cloud_upload
                  </span>
                </div>
              </div>
              <!-- End of drop zone -->
              <!-- File is added -->
              <div
                v-else
                v-cloak
                id="drop-area"
                v-b-tooltip.hover.right="$t('fileIsUploadedAndReadyToGo')"
                class="ui-cloud-upload --wrapper d-flex justify-content-center"
              >
                <div class="d-block align-self-center">
                  <div class="material-icons ui-cloud-upload --cloud">
                    cloud_queue
                  </div>
                  <div class="font-bold-dark-gray">
                    {{ file.name }} ({{ file.size | dataSize }})
                  </div>
                </div>
              </div>
              <!-- Remove button -->
              <div
                v-if="file !== ''"
                class="d-flex justify-content-center pb-3"
                @click="removeUploadedFile()"
              >
                <div class="circular-btn --wrapper --dark --hover pointer">
                  <div class="material-icons align-self-center">
                    delete
                  </div>
                </div>
              </div>
              <!-- End -->
              <!-- Upload button -->
              <div v-if="file !== ''" class="text-center">
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
        <ClientOnly>
          <b-col v-if="$store.state.dock.new_dock.bucket" sm="6">
            <a target="_blank" :href="$store.state.dock.new_dock.bucket">{{
              $store.state.dock.new_dock.bucket
            }}</a>

            <img
              :src="$store.state.dock.new_dock.screenshot"
              width="100%"
              height="100%"
            />
          </b-col>
        </ClientOnly>

        <!-- <b-col sm="6" v-if="screenshot"> -->
        <!-- </b-col> -->
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
      source: 'do'
    },
    error: {
      title: null,
      description: null
    },
    file: '',
    screenshot: '',
    bucket: ''
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
    this.$store.commit('page/setPageDesc', this.$t('cutAndRunDeploymentDesc'))
    // this.$store.commit('dock/put', {})
  },
  methods: {
    handleFileUpload(index) {
      if (this.$refs.file.files[0]) {
        const file = this.$refs.file.files[0]
        this.file = file
      } else {
        const file = index.dataTransfer.files[0]
        this.file = file
      }
    },
    removeUploadedFile() {
      this.file = ''
    },
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
        this.finalize()
      }
    },
    async finalize() {
      // debugger
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('data', this.form.title)
      const self = this
      // console.log('finalise before api', this.file)
      this.$store.commit('setGlobalLoader', true)
      // setTimeout(() => {
      //   debugger
      //   self.$store.commit('setGlobalLoader', false)
      //   self.bucket = '3234234234'
      // }, 5000)
      const res =
        this.form.source === 'do'
          ? await this.$axios.post('/api/deploy/cut-and-run/space', formData)
          : await this.$axios.post('/api/deploy/cut-and-run/s3', formData)
      self.$store.commit('setGlobalLoader', false)
      // self.screenshot = 'data:image/png;base64,' + res.data.screenshot
      // self.bucket = res.data.bucket
      if (res && !res.data.error) {
        self.$store.commit('dock/put', {
          title: this.form.title,
          description: this.form.description,
          source: this.form.source,
          bucket: res.data.bucket,
          screenshot: 'data:image/png;base64,' + res.data.screenshot,
          static: true
        })
        self.$store.dispatch('dock/createDock')
      }
      // console.log(self.screenshot)
    }
  },
  head() {
    return {
      title: this.$t('cutAndRunDeployment')
    }
  }
}
</script>
