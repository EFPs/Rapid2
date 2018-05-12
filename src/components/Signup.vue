<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignUp">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                color="textBox"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                color="textBox"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                color="textBox"
                required
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
                ></v-text-field>
            </v-flex>
            <v-flex>
              <h5 color="red">Warning: Double check your ID, this website based heavily on this information !</h5>
              <v-text-field
                name="sid"
                label="Student ID"
                id="sid"
                type="text"
                color="textBox"
                required
                v-model="sid"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                name="major"
                :items="majors"
                v-model="major"
                label="Select Major"
                item-text="major"
                color="textBox"
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
                color="textBox"
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
                color="textBox"
                v-model="lastName"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
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
