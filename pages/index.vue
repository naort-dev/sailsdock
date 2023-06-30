<template>
  <b-row class="w-100 m-0" style="height: 100vh;">
    <b-col lg="6">
      <Create v-if="$store.state.auth.toggle.create" />
      <Signin v-if="$store.state.auth.toggle.signin" />
      <Recovery v-if="$store.state.auth.toggle.recovery" />
      <Loader v-if="$store.state.auth.loader" />
    </b-col>
    <b-col lg="6" class="d-none d-lg-block bg-theme">
      <b-row class="justify-content-center h-100">
        <b-col align-self="center" sm="12" md="6">
          <Floater />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import Create from '@/components/blocks/auth/Create'
import Signin from '@/components/blocks/auth/Signin'
import Recovery from '@/components/blocks/auth/Recovery'
import Loader from '@/components/blocks/app/GlobalLoader'
import Floater from '~/components/blocks/auth/blocks/FloatingBoat.vue'
export default {
  components: {
    Create,
    Signin,
    Recovery,
    Loader,
    Floater
  },
  created() {
    this.$fireAuth.onAuthStateChanged(async (authUser) => {
      await this.$store.dispatch('auth/handleSuccessfulAuthentication', {
        authUser
      })
    })
  },
  middleware: 'anonymous'
}
</script>
<style lang="scss">
.toggle-password {
  position: absolute;
  top: 7px;
  right: -40px;
  cursor: pointer;
}
.auth-link {
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.auth-submit {
  border-radius: 0;
  background-color: black;
}
.auth-card {
  .card-body {
    padding: 0 !important;
  }
}
@media only screen and (min-width: 600px) {
  .auth-card {
    .card-body {
      padding: 2rem !important;
    }
  }
}
</style>
