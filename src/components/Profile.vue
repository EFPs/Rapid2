<template>
  <v-container grid-list-md text-xs-center >
    <v-layout row wrap >

      <v-flex xs4>
        <v-jumbotron  :gradient="gradient"
                      >
          cOL1
        <v-layout column>
          <v-flex>
            <v-btn v-on:click.native = 'getCreditSum'> as</v-btn>
            <h1>PHOTO</h1>
            <!--<v-avatar-->
              <!--:tile="tile"-->
              <!--:size="100"-->
              <!--color="grey lighten-4"-->
            <!--&gt;-->
              <!--<img src= '' alt="avatar"/>-->
            <!--</v-avatar>-->
          </v-flex>
        </v-layout>

            <v-spacer></v-spacer>
            <v-layout column>
              <v-flex>
                <v-btn flex>Edit profile</v-btn>
              </v-flex>
              <v-flex>
                <v-btn v-on:click.native='goToSetup'>Edit course</v-btn>
              </v-flex>
            </v-layout>
          </v-jumbotron>
      </v-flex>
      <v-spacer xs1></v-spacer>
      <v-flex xs7>
        COL2
        <v-layout column>
          <v-flex >
            R1
            <v-layout row align-center>
              <v-flex>
                Remaining credit {{ this.creditSum }}
              </v-flex>

              <v-flex>
                Remaining credit
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex>
              Text Box
            <v-card>
              <v-toolbar color="info" dark>
                <v-toolbar-title>Profile</v-toolbar-title>
              </v-toolbar>
              <v-card-text align-left>
                <span class="title" >Personal Info</span>
              </v-card-text>
              <v-card-text>
                <span class="title">Student ID :   {{ userInfo[4]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">Major :   {{ userInfo[3]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">First Name :    {{ userInfo[1]['.value'] }}</span>

              </v-card-text>
              <v-card-text>
                <span class="title">Last Name :   {{ userInfo[2]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">E-mail :    {{ this.email }}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>


      </v-flex>

    </v-layout>

  </v-container>



</template>


<script>
  import {auth, db} from '../firebase'
  import firebase from 'firebase'
  import router from '../router'
  export default{
    data () {
      return {
        photoUrl: auth.currentUser.photoURL,
        creditSum: 0,
        user: firebase.auth().currentUser,
        gradient: 'to top, #7B1FA2, #E1BEE7',
        email: auth.currentUser.email,
        userInfo: []
      }
    },
    firebase: function () {
      return {
        userInfo: {
          source: db.ref('users/' + this.user.uid)
        },
        takenCourses: {
          source: db.ref('users/' + this.user.uid + '/takenCourses')
        }
      }
    },
    beforeCreate () {
      this.getCreditSum()
      // firebase.auth().onAuthStateChanged((user) => {
      //   // initially user = null, after auth it will be either <fb_user> or false
      //   this.$store.commit('setUser', user || false)
      //   if (user) {
      //
      //   } else if (!user && this.$route.path !== '/login') {
      //     this.$router.replace('/login')
      //   }
      // })
    },
    beforeMount () {
      this.getCreditSum()
    },
    methods: {
      a () {
        console.log(this.user)
        console.log(this.userInfo)
        this.getCreditSum()
      },
      goToSetup () {
        console.log('Go to setup')
        router.push('/setup')
      },
      getCreditSum () {
        this.creditSum = 0
        let i = 0
        console.log('yo', this.takenCourses)
        console.log('Hey', this.takenCourses.length)
        for (i = 0; i < this.takenCourses.length; i++) {
          console.log('credit', this.takenCourses[i].Credits)
          // console.log('as', this.takenCourses[i])
          this.creditSum += this.takenCourses[i].Credits
        }
      }
    },
    computed: {
      creditSum: function () {
        console.log('From compute')
        // this.creditSum = 0
        // let course
        // for (course in this.takenCourses) {
        //   console.log(course)
        //   this.creditSum += course.credit
        // }
      }
    }
  }
</script>
