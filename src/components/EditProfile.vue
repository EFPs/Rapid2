<template>
  <v-container grid-list-md text-xs-center>
    <h1 style="color: white;"> Only filled in what you want to change. </h1>
    <v-layout column wrap>
        <v-flex >
          <v-text-field
            name="email"
            label="Email"
            v-model="email"
            color="primary"
            dark
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="firstName"
            label="First Name"
            v-model="firstName"
            color="primary"
            dark
          ></v-text-field>
        </v-flex>
        <v-flex >
          <v-text-field
            name="lastName"
            label="Last Name"
            v-model="lastName"
            color="primary"
            dark
          ></v-text-field>
        </v-flex>
        <v-flex >
          <v-select
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
    </v-layout>
    <v-btn large color="success" v-on:click.native="confirm">confirm</v-btn>
    <v-btn v-on:click.native="toProfile">back</v-btn>
  </v-container>
</template>

<script>
  import {auth, db} from '../firebase'
  import router from '../router'
  export default {
    data () {
      return {
        user: auth.currentUser,
        userRef: db.ref('users/' + auth.currentUser.uid),
        email: '',
        firstName: '',
        lastName: '',
        major: '',
        majors: [
          { major: 'CS' },
          { major: 'MK' },
          { major: 'PY' }
        ]
        // email: auth.currentUser.email,
        // firstName: db.ref('users/' + auth.currentUser.uid + '/firstName')['.value'],
        // lastName: db.ref('users/' + auth.currentUser.uid + '/lastName')['.value'],
        // major: db.ref('users/' + auth.currentUser.uid + '/major')['.value']
      }
    },
    firebase: function () {
      return {

        userInfo: this.userRef

      }
    },
    methods: {
      confirm () {
        let confirmString = 'Confirm the following changes\nE-mail : '
        if (this.email === '') {
          this.email = 'No Changes'
        }
        if (this.firstName === '') {
          this.firstName = 'No Changes'
        }
        if (this.lastName === '') {
          this.lastName = 'No Changes'
        }
        if (this.major === null || this.major === '') {
          this.major = 'No Changes'
        } else {
          this.major = this.major.major
        }
        confirmString += this.email + '\n' + 'First Name : ' + this.firstName + '\n' + 'Last Name : ' + this.lastName + '\n' + 'Major : ' + this.major
        if (window.confirm(confirmString)) {
          if (this.firstName !== 'No Changes') {
            this.user.updateProfile({displayName: this.firstName})
            this.$firebaseRefs.userInfo.child('firstName').set(this.firstName)
          }
          if (this.lastName !== 'No Changes') {
            this.$firebaseRefs.userInfo.child('lastName').set(this.lastName)
          }
          if (this.email !== 'No Changes') {
            this.user.updateEmail(this.email)
            this.$firebaseRefs.userInfo.child('email').set(this.email)
          }
          if (this.major !== 'No Changes') {
            this.$firebaseRefs.userInfo.child('email').set(this.major)
          }
        } else {
          if (this.email === 'No Changes') {
            this.email = ''
          }
          if (this.firstName === 'No Changes') {
            this.firstName = ''
          }
          if (this.lastName === 'No Changes') {
            this.lastName = ''
          }
          if (this.major === 'No Changes') {
            this.major = ''
          }
        }
      },
      toProfile () {
        router.push('/profile')
        location.reload()
      },
      getIndexUserInfo (key) {
        let i = 0
        for (i = 0; i < this.userInfo.length; i++) {
          // console.log(this.userInfo[i]['.key'])
          if (this.userInfo[i]['.key'] === key) {
            return i
          }
        }
        return -1
      },
      a () {
        console.log(this.userInfo)
        console.log(this.getIndexUserInfo('firstName'))
      }
    }
  }
</script>
