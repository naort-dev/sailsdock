<template>
  <b-row
    v-if="$store.state.auth.toggle.create"
    class="h-100 justify-content-center"
  >
    <b-col align-self="center" sm="12" md="8">
      <b-card class="child-key-right-in bg-card border-0 auth-card">
        <div class="text-center mb-5">
          <h1 class="text small-title child-key-right-in">
            {{ $t('signup') }}
          </h1>
        </div>
        <b-container class="p-0">
          <b-row class="justify-content-center">
            <b-col>
              <!-- Form -->
              <b-form class="child-key-right-in w-100">
                <b-form-group id="input-group-name">
                  <b-form-input
                    id="input-name"
                    v-model="form.name"
                    :placeholder="$t('name')"
                    :state="validateState('name')"
                    aria-describedby="username-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="username-feedback">{{
                    error.name
                  }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-email">
                  <b-form-input
                    id="input-email"
                    v-model="form.email"
                    type="email"
                    autocomplete="username"
                    :placeholder="$t('email')"
                    :state="validateState('email')"
                    aria-describedby="email-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="email-feedback">{{
                    error.email
                  }}</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-password">
                  <div class="display flex position-relative">
                    <b-form-input
                      id="text-password"
                      v-model="form.password"
                      :type="passwordFieldType"
                      autocomplete="new-password"
                      :placeholder="$t('password')"
                      :state="validateState('password')"
                      aria-describedby="password-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="password-feedback">{{
                      error.password
                    }}</b-form-invalid-feedback>
                    <div
                      type="password"
                      class="toggle-password"
                      @click="switchVisibility()"
                    >
                      <i
                        class="material-icons"
                        :class="{
                          'see-password notVisible': !pwVisible,
                          'see-password visible': pwVisible
                        }"
                      >
                        remove_red_eye
                      </i>
                    </div>
                  </div>
                </b-form-group>
                <div class="button --primary w-100" @click="checkForm()">
                  {{ $t('createAccount') }}
                </div>
                <div class=" cursor pointer text-left mt-3">
                  <span
                    class="auth-link"
                    @click="
                      $store.commit('auth/toggleToSignIn', true),
                        $store.commit('auth/toggleToCreate', false)
                    "
                  >
                    {{ $t('haveaccount') }}
                  </span>
                </div>
              </b-form>
              <!-- End -->
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data: () => ({
    pwVisible: false,
    passwordFieldType: 'password',
    form: {
      name: null,
      email: null,
      password: null,
      tos: true
    },
    error: {
      name: null,
      email: null,
      password: null,
      tos: null
    },
    submit: false
  }),
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
      this.pwVisible = !this.pwVisible
    },
    validateState(title) {
      if (title === 'name') {
        if (this.form.name === '') {
          this.error.name = this.$t('requiredNameError')
          return false
        } else {
          this.error.name = null
        }
      }
      if (title === 'email') {
        if (this.form.email === '') {
          this.error.email = this.$t('requiredEmailError')
          return false
        } else if (this.form.email && !this.validEmail(this.form.email)) {
          this.error.email = this.$t('validEmailError')
          return false
        } else {
          this.error.email = null
        }
      }
      if (title === 'password') {
        if (this.form.password === '') {
          this.error.password = this.$t('requiredPasswordError')
          return false
        } else {
          this.error.password = null
        }
      }
    },
    checkForm() {
      if (!this.form.name) {
        this.error.name = this.$t('requiredNameError')
        this.form.name = ''
      } else {
        this.error.name = null
      }
      if (!this.form.email) {
        this.error.email = this.$t('requiredEmailError')
        this.form.email = ''
      } else if (!this.validEmail(this.form.email)) {
        this.error.email = this.$t('validEmailError')
      } else {
        this.error.email = null
      }
      if (!this.form.password) {
        this.error.password = this.$t('requiredPasswordError')
        this.form.password = ''
      } else {
        this.error.password = null
      }
      if (!this.form.tos) {
        this.error.tos = 'else_checkbox'
      } else {
        this.error.tos = null
      }
      if (
        !this.error.name &&
        !this.error.email &&
        !this.error.password &&
        !this.error.tos
      ) {
        this.createUser()
      }
    },
    validEmail(email) {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },
    async createUser() {
      await this.$store.dispatch('auth/createAccount', this.form)
    }
  }
}
</script>
