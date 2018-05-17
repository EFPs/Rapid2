<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 style="color: white">Sign Up As Student</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignUp">
          <v-flex>
            <v-alert type="error" dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-layout column :style="{'background-color': 'rgba(0,0,0,0.5)', 'border-radius': '15px'}">
            <br/>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                color="primary"
                v-model="email"
                dark
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                color="primary"
                v-model="password"
                dark
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                color="primary"
                dark
                required
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
                ></v-text-field>
            </v-flex>
            <v-flex>
              <h5 style="color: lawngreen">Warning: Double check your information below, this website based heavily on these information !</h5>
              <v-text-field
                name="sid"
                label="Student ID"
                id="sid"
                type="text"
                color="primary"
                dark
                required
                v-model="sid"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                transition="slide-y-reverse-transition"
                name="major"
                :items="majors"
                v-model="major"
                label="Select Major"
                item-text="major"
                color="primary"
                dark
                autocomplete
                required
              ></v-select>
            </v-flex>
            <v-flex>
              <v-text-field
                name="firstName"
                label="First Name"
                id="firstName"
                type="text"
                required
                color="primary"
                dark
                v-model="firstName"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="lastName"
                label="Last Name"
                id="lastName"
                type="text"
                required
                color="primary"
                dark
                v-model="lastName"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn @click.native="loader = 'loading'" :loading="loading" color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
              <v-btn to="/signin">Cancel</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      major: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      alert: false,
      sid: '',
      majors: [
        { major: 'CS' },
        { major: 'MK' },
        { major: 'PY' }
      ]
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    userSignUp () {
      if (this.comparePasswords !== true) {
        return
      }
      this.$store.dispatch('userSignUp', { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName, sid: this.sid, major: this.major['major'] })
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
