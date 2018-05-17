<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 style="color: white;">Sign Up As Lecturer</h1>
      </v-flex>
      <v-flex>
        <v-alert type="error" dismissible v-model="alert">
          {{ error }}
        </v-alert>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignUp">
          <v-layout column :style="{'background-color': 'rgba(0,0,0,0.5)', 'border-radius': '15px'}">
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <br/>
            <v-flex>
              <v-text-field
                dark
                name="email"
                label="Email"
                id="email"
                type="email"
                color="primary"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                dark
                name="password"
                label="Password"
                id="password"
                type="password"
                color="primary"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                dark
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                color="primary"
                required
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                dark
                name="major"
                :items="majors"
                v-model="major"
                label="Select Major"
                item-text="major"
                color="primary"
                autocomplete
                required
              ></v-select>
            </v-flex>
            <v-flex>
              <v-text-field
                dark
                name="firstName"
                label="First Name"
                id="firstName"
                type="text"
                required
                color="primary"
                v-model="firstName"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                dark
                name="lastName"
                label="Last Name"
                id="lastName"
                type="text"
                required
                color="primary"
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
        majors: [
          { major: 'CS' }
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
        this.$store.dispatch('LecturerSignUp', { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName, major: this.major['major'] })
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
