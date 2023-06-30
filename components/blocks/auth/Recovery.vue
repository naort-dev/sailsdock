<template>
  <b-row
    v-if="$store.state.auth.toggle.recovery"
    class="h-100 justify-content-center"
  >
    <b-col align-self="center" sm="12" md="8">
      <b-card class="child-key-right-in bg-card border-0 auth-card">
        <div class="text-center mb-5">
          <h1 class="text small-title child-key-right-in">
            {{ $t('recovery') }}
          </h1>
        </div>
        <b-container class="p-0">
          <b-row class="justify-content-center">
            <b-col>
              <!-- Form -->
              <b-form class="child-key-right-in w-100 p-3">
                <b-form-group id="input-group-1">
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    :placeholder="$t('email')"
                  ></b-form-input>
                </b-form-group>
                <div class="button --primary w-100" @click="recoverPassword()">
                  {{ $t('recovery') }}
                </div>

                <div class=" cursor pointer text-right mt-5">
                  <span
                    class="auth-link"
                    @click="
                      $store.commit('auth/toggleToSignIn', true),
                        $store.commit('auth/toggleToRecovery', false)
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
    form: {
      email: null
    },
    recovered: false
  }),
  methods: {
    recoverPassword() {
      this.recovered = true
      this.$store.commit('auth/toggleToRecovery', false)
    }
  }
}
</script>
