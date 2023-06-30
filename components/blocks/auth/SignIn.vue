<template>
  <b-row
    v-if="$store.state.auth.toggle.signin"
    class="h-100 justify-content-center"
  >
    <b-col align-self="center" sm="12" md="8">
      <b-card class="child-key-right-in bg-card border-0 auth-card">
        <div class="text-center mb-5">
          <h1 class="text small-title child-key-right-in">
            {{ $t('signin') }}
          </h1>
        </div>
        <b-container class="p-0">
          <b-row class="justify-content-center">
            <b-col>
              <b-form class="child-key-right-in  w-100">
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
                      :state="
                        validateState('password') ||
                          (error.password ? false : null)
                      "
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
                <b-row>
                  <div class="button --primary w-100" @click="checkForm()">
                    {{ $t('signin') }}
                  </div>

                  <div class="col cursor pointer text-left mt-5">
                    <span
                      class="auth-link text-dark"
                      @click="
                        $store.commit('auth/toggleToCreate', true),
                          $store.commit('auth/toggleToSignIn', false)
                      "
                    >
                      {{ $t('createAccount') }}
                    </span>
                  </div>
                  <div class="col mt-5 cursor pointer text-right">
                    <span
                      class="auth-link text-dark"
                      @click="
                        $store.commit('auth/toggleToRecovery', true),
                          $store.commit('auth/toggleToSignIn', false)
                      "
                    >
                      {{ $t('forgotpassword') }}
                    </span>
                  </div>
                </b-row>
              </b-form>
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
      checked: true
    },
    error: {
      email: null,
      password: null
    }
  }),
  methods: {
    validateState1(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
      this.pwVisible = !this.pwVisible
    },
    validateState(title) {
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
      if (!this.form.email) {
        this.error.email = this.$t('requiredEmailError')
        this.form.email = ''
      } else if (!this.validEmail(this.form.email)) {
        this.error.email = this.$t('validEmailError')
        this.email = ''
      } else {
        this.error.email = null
      }
      if (!this.form.password) {
        this.error.password = this.$t('requiredPasswordError')
        this.form.password = ''
      } else {
        this.error.password = null
      }
      if (!this.error.email && !this.error.password) {
        this.signIn()
      }
    },
    validEmail(email) {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },
    async signIn() {
      await this.$store.dispatch('auth/signInUser', this.form)
    }
  }
}
</script>
