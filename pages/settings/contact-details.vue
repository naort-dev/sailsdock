<template>
  <div v-if="$store.state.page.title" class="ui-user --display pb-5">
    <b-container class="pl-5">
      <b-row class="justify-content-start h-100 w-md-50">
        <!-- 1) First name -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <b-form-group
              id="input-group-name"
              label-for="input-name"
              :label="$t('name')"
              class="text-left"
            >
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
            <!-- End -->
          </b-form>
        </b-col>
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <!-- 2) Last name -->
            <b-form-group
              id="input-group-last-name"
              label-for="input-last-name"
              :label="$t('lastName')"
              class="text-left"
            >
              <b-form-input
                id="input-last-name"
                v-model="form.lastName"
                :placeholder="$t('lastName')"
                :state="validateState('lastName')"
                aria-describedby="lastName-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="lastName-feedback">{{
                error.lastName
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
          </b-form>
        </b-col>
        <b-col
          sm="6"
          align-self="center"
          class="text-center text-md-right pr-md-0"
        >
          <b-form class="child-key-right-in w-100">
            <!-- 3) Address line 1 -->
            <b-form-group
              id="input-group-address-line-1"
              label-for="input-address-line-1"
              :label="$t('addressLine1')"
              class="text-left"
            >
              <b-form-input
                id="input-address-line-1"
                v-model="form.addressLine1"
                :placeholder="$t('addressLine1')"
                :state="validateState('addressLine1')"
                aria-describedby="address-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="addressLine1-feedback">{{
                error.addressLine1
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
          </b-form>
        </b-col>
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <!-- 4) Address line 2 -->
            <b-form-group
              id="input-group-address-line-2"
              label-for="input-address-line-2"
              :label="$t('addressLine2')"
              class="text-left"
            >
              <b-form-input
                id="input-address-line-2"
                v-model="form.addressLine2"
                :placeholder="$t('addressLine2')"
                :state="validateState('addressLine2')"
                aria-describedby="address-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="addressLine2-feedback">{{
                error.addressLine2
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
          </b-form>
        </b-col>
        <!-- 5) City / Town -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <b-form-group
              id="input-group-city"
              label-for="input-city"
              :label="$t('city')"
              class="text-left"
            >
              <b-form-input
                id="input-city"
                v-model="form.city"
                :placeholder="$t('city')"
                :state="validateState('city')"
                aria-describedby="city-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="city-feedback">{{
                error.city
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
        </b-col>
        <!-- End -->
        <!-- 6) Zip / Postal code -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <b-form-group
              id="input-group-postal"
              label-for="input-postal"
              :label="$t('postal')"
              class="text-left"
            >
              <b-form-input
                id="input-postal"
                v-model="form.postal"
                :placeholder="$t('postal')"
                :state="validateState('postal')"
                aria-describedby="postal-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="postal-feedback">{{
                error.postal
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
        </b-col>
        <!-- End -->
        <!-- 7) State -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <b-form-group
              id="input-group-state"
              label-for="input-state"
              :label="$t('state')"
              class="text-left"
            >
              <b-form-input
                id="input-state"
                v-model="form.state"
                :placeholder="$t('state')"
                :state="validateState('state')"
                aria-describedby="state-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="state-feedback">{{
                error.state
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
        </b-col>
        <!-- End -->
        <!-- 8) Country -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <b-form-group
              id="select-group-country"
              label-for="select-country"
              :label="$t('country')"
              class="text-left"
            >
              <b-select
                id="select-name"
                v-model="form.country"
                :options="countries"
                type="text"
                :placeholder="$t('country')"
                aria-describedby="country-feedback"
                :state="validateState('country')"
              />
              <b-form-invalid-feedback id="country-feedback">{{
                error.country
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
        </b-col>
        <!-- End -->
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <!-- 9) Phone -->
            <b-form-group
              id="input-group-phone"
              label-for="input-phone"
              :label="$t('phone')"
              class="text-left"
            >
              <b-form-input
                id="input-phone"
                v-model="form.phone"
                :placeholder="$t('phone')"
                :state="validateState('phone')"
                aria-describedby="phone-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="phone-feedback">{{
                error.phone
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
          </b-form>
        </b-col>
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <b-form class="child-key-right-in w-100">
            <!-- 10) Email -->
            <b-form-group
              id="input-group-email"
              label-for="input-email"
              :label="$t('email')"
              class="text-left"
            >
              <b-form-input
                id="input-email"
                v-model="form.email"
                :placeholder="$t('email')"
                :state="validateState('email')"
                aria-describedby="email-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="email-feedback">{{
                error.email
              }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- End -->
          </b-form>
        </b-col>
        <b-col sm="6" align-self="center" class="text-md-right pr-md-0">
          <div
            class="button --primary"
            style="display: flex!important;"
            @click="checkForm()"
          >
            <div class="w-100">{{ $t('save') }}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import countries from '~/data/countries.json'
export default {
  name: 'ContactDetails',
  layout: 'protected',
  middleware: 'authenticated',
  data: () => ({
    dynamicGreeting: null,
    structuredDescription: null,
    countries,
    form: {
      name: null,
      lastName: null,
      addressLine1: null,
      addressLine2: null,
      postal: null,
      city: null,
      state: null,
      country: null,
      phone: null,
      email: null
    },
    error: {
      name: null,
      lastName: null,
      addressLine1: null,
      addressLine2: null,
      postal: null,
      city: null,
      state: null,
      country: null,
      phone: null,
      email: null
    }
  }),
  mounted() {
    // Set v-model from firestore
    if (this.$store.state.user.collection.name) {
      this.form.name = this.$store.state.user.collection.name
    } else {
      this.form.name = this.$store.state.user.collection.displayName.split(
        ' '
      )[0]
    }
    if (this.$store.state.user.collection.lastName) {
      this.form.lastName = this.$store.state.user.collection.lastName
    } else {
      this.form.lastName = this.$store.state.user.collection.displayName.split(
        ' '
      )[1]
    }
    this.form.addressLine1 = this.$store.state.user.collection.address.line1
    this.form.addressLine2 = this.$store.state.user.collection.address.line2
    this.form.postal = this.$store.state.user.collection.address.postal_code
    this.form.city = this.$store.state.user.collection.address.city
    this.form.state = this.$store.state.user.collection.address.state
    this.form.country = this.$store.state.user.collection.address.country
    this.form.phone = this.$store.state.user.collection.phoneNumber
    this.form.email = this.$store.state.user.collection.email
    // Get meta title and commit it to the page title
    this.$store.commit('page/setPageTitle', this.$metaInfo.title)
    // Page Description
    this.$store.commit(
      'page/setPageDesc',
      this.$t('contactDetailsPageDescription')
    )
  },
  methods: {
    validateState(title) {
      if (title === 'name') {
        if (this.form.name === '') {
          this.error.name = this.$t('requiredNameError')
          return false
        } else {
          this.error.name = null
        }
      }
      if (title === 'lastName') {
        if (this.form.lastName === '') {
          this.error.lastName = this.$t('requiredLastNameError')
          return false
        } else {
          this.error.lastName = null
        }
      }
      if (title === 'addressLine1') {
        if (this.form.addressLine1 === '') {
          this.error.addressLine1 = this.$t('requiredAddressLine1Error')
          return false
        } else {
          this.error.addressLine1 = null
        }
      }
      if (title === 'postal') {
        if (this.form.postal === '') {
          this.error.postal = this.$t('requiredPostalError')
          return false
        } else {
          this.error.postal = null
        }
      }
      if (title === 'city') {
        if (this.form.city === '') {
          this.error.city = this.$t('requiredCityError')
          return false
        } else {
          this.error.city = null
        }
      }
      if (title === 'state') {
        if (this.form.state === '') {
          this.error.state = this.$t('requiredStateError')
          return false
        } else {
          this.error.state = null
        }
      }
      if (title === 'country') {
        if (this.form.country === '') {
          this.error.country = this.$t('requiredCountryError')
          return false
        } else {
          this.error.country = null
        }
      }
      if (title === 'phone') {
        if (this.form.phone === '') {
          this.error.phone = this.$t('requiredPhoneError')
          return false
        } else {
          this.error.phone = null
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
    },
    checkForm() {
      if (!this.form.name) {
        this.error.name = this.$t('requiredNameError')
        this.form.name = ''
      } else {
        this.error.name = null
      }
      if (!this.form.lastName) {
        this.error.lastName = this.$t('requiredLastNameError')
        this.form.lastName = ''
      } else {
        this.error.lastName = null
      }
      if (!this.form.addressLine1) {
        this.error.addressLine1 = this.$t('requiredAddressLine1Error')
        this.form.addressLine1 = ''
      } else {
        this.error.addressLine1 = null
      }
      if (!this.form.postal) {
        this.error.postal = this.$t('requiredPostalError')
        this.form.postal = ''
      } else {
        this.error.postal = null
      }
      if (!this.form.city) {
        this.error.city = this.$t('requiredCityError')
        this.form.city = ''
      } else {
        this.error.city = null
      }
      if (!this.form.state) {
        this.error.state = this.$t('requiredStateError')
        this.form.state = ''
      } else {
        this.error.state = null
      }
      if (!this.form.country) {
        this.error.country = this.$t('requiredCountryError')
        this.form.country = ''
      } else {
        this.error.country = null
      }
      if (!this.form.phone) {
        this.error.phone = this.$t('requiredPhoneError')
        this.form.phone = ''
      } else {
        this.error.phone = null
      }
      if (!this.form.email) {
        this.error.email = this.$t('requiredEmailError')
        this.form.email = ''
      } else if (!this.validEmail(this.form.email)) {
        this.error.email = this.$t('validEmailError')
      } else {
        this.error.email = null
      }
      if (
        !this.error.name &&
        !this.error.lastName &&
        !this.error.addressLine1 &&
        !this.error.postal &&
        !this.error.city &&
        !this.error.state &&
        !this.error.country &&
        !this.error.phone &&
        !this.error.email
      ) {
        this.updateUserCollection()
      }
    },
    validEmail(email) {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },
    async updateUserCollection() {
      const userRef = this.$fireStore
        .collection('users')
        .doc(this.$fireAuth.currentUser.uid)
      try {
        await userRef.update({
          name: this.form.name,
          lastName: this.form.lastName,
          address: {
            city: this.form.city,
            country: this.form.country,
            line1: this.form.addressLine1,
            line2: this.form.addressLine2,
            postal_code: this.form.postal,
            state: this.form.state
          },
          phoneNumber: this.form.phone,
          email: this.form.email
        })
      } catch (e) {
        this.$store.dispatch('error', e, { root: true })
      }
    }
  },
  head() {
    return {
      title: this.$t('contactDetails')
    }
  }
}
</script>
