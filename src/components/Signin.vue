<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
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
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>

          </v-layout>
        </form>
      </v-flex>
      <v-flex class="text-xs-center" mt-5>
        <v-btn dark true v-on:click="facebookSignIn" color="facebook" type="submit">Sign In using Facebook</v-btn>
        <v-btn dark true v-on:click="googleSignIn" color="google" type="submit">Sign In using Google</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {faceProvider, auth, gooProvider} from '../firebase'

export default {
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    googleSignIn: function () {
      auth.signInWithPopup(gooProvider).then((result) => { this.$store.dispatch('socialMediaSignUp', result.user) })
    },
    facebookSignIn: function () {
      auth.signInWithPopup(faceProvider).then((result) => { this.$store.dispatch('socialMediaSignUp', result.user) })
    },
    userSignIn () {
      this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
    }
  },
  // Defind new variable
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  // What to do when velue change
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
