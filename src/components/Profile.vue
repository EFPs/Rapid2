<template >
  <div :style="{ 'background-image': 'url(' + img + ')', 'border-radius': '20px' }">
  <v-jumbotron  :gradient="gradientBg" height="1000" >
  <v-container grid-list-md text-xs-center fluid>

    <v-layout column>
      <v-flex md10 offset-md-10 hight="1000">
      </v-flex>

    <v-layout row wrap >
      <v-flex offset-md-7></v-flex>
      <v-flex xs4 >
        <v-jumbotron  :gradient="gradient">
          <br/>
        <v-flex  >
          <h1>{{ this.name }}</h1>
        </v-flex>


        <v-layout column >

          <br/>
          <v-flex xs4 align-content-center>
            <v-avatar
              :size="100"
              color="grey lighten-4"
            >
              <img src={this.img} />
            </v-avatar>
            <!--<h1>{{ this.user.displayName }}</h1>-->



          </v-flex>


        </v-layout>
        <v-layout column >
          <br/><br/>
          <v-flex xs1 align-content-center>
            <v-btn dark color="secondary" v-on:click.native='goToEdit' flex>Edit profile</v-btn>
          </v-flex>
        </v-layout>
        <v-layout column >
          <v-flex xs1 align-content-center>
            <v-btn dark color="primary" v-on:click.native='goToSetup'>Edit course</v-btn>
          </v-flex>
        </v-layout>
          </v-jumbotron>
      </v-flex>
      <!--<v-spacer xs1></v-spacer>-->
      <v-flex offset-md-10></v-flex>
      <v-flex xs7>

        <v-layout column>
          <v-flex>

            <v-layout row align-center>
              <v-flex style="background-color: rgba(0, 179, 0,0.7); border-radius: 15px">
                <h2 style="color: wheat;"> Credits Own : {{ this.creditSum }}</h2>
              </v-flex>
              <v-flex ml-2 style="background-color: rgba(0, 172, 230,0.6); border-radius: 15px">
                <h2 style="color: wheat;"> Credits Remaining : {{ this.maxCredits - this.creditSum  }}</h2>

              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex ></v-flex>
          <v-flex xs 4 >
            <v-card dark>
              <v-toolbar color="info" >
                <v-toolbar-title >Profile</v-toolbar-title>

              </v-toolbar>
              <v-card-text align-left>
                <span class="title" >Personal Info</span>
              </v-card-text>
              <v-card-text>
                <span class="title">Student ID :   {{ userInfo[getIndexUserInfo('sid')]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">Major :   {{ userInfo[getIndexUserInfo('major')]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">First Name :    {{ userInfo[getIndexUserInfo('firstName')]['.value'] }}</span>

              </v-card-text>
              <v-card-text>
                <span class="title">Last Name :   {{ userInfo[getIndexUserInfo('lastName')]['.value'] }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">E-mail :    {{ this.email }}</span>
              </v-card-text>
            </v-card>
            <v-btn v-on:click.native = 'a'> as</v-btn>
          </v-flex>
        </v-layout>


      </v-flex>
      <v-flex offset-md-7></v-flex>

    </v-layout>
    </v-layout>

  </v-container>

  </v-jumbotron>
  </div>
</template>


<script>
  import {auth, db} from '../firebase'
  import firebase from 'firebase'
  import router from '../router'
  export default {
    data () {
      return {
        img: 'static/la3.jpg',
        name: 'none',
        maxCredits: 'none',
        photoUrl: auth.currentUser.photoURL,
        creditSum: 'none',
        user: firebase.auth().currentUser,
        gradient: 'to top, #7B1FA2, #E1BEE7',
        gradientBg: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
        email: auth.currentUser.email,
        userInfo: []
      }
    },
    firebase: function () {
      return {
        majorCredits: {
          source: db.ref('demoMajorCredits/')
        },
        userInfo: {
          source: db.ref('users/' + this.user.uid)
        },
        takenCourses: {
          source: db.ref('users/' + this.user.uid + '/takenCourses')
        }
      }
    },
    beforeUpdate () {
      // console.log('User',this.userInfo)
      if (this.name === 'none') {
        this.name = this.user.displayName
      }

      if (this.creditSum === 'none') {
        let i = 0
        this.creditSum = 0
        console.log('Taken Courses', this.takenCourses)
        console.log('Length', this.takenCourses.length)
        for (i = 0; i < this.takenCourses.length; i++) {
          console.log('credit', this.takenCourses[i].credits)
          // console.log('as', this.takenCourses[i])
          this.creditSum += parseInt(this.takenCourses[i].credits)
        }
      }

      if (this.maxCredits === 'none') {
        let major
        let i = 0
        this.maxCredits = 0
        console.log('allmajor', this.majorCredits)
        for (i = 0; i < this.userInfo.length; i++) {
          if (this.userInfo[i]['.key'] === 'major') {
            major = this.userInfo[i]['.value']
            break
          }
        }
        for (i = 0; i < this.majorCredits.length; i++) {
          if (this.majorCredits[i]['.key'] === major) {
            break
          }
          i = -1
        }
        console.log('major', major)
        console.log('indexTotal', i)
        this.maxCredits = this.majorCredits[i].total
        console.log('Max Credits', this.maxCredits)
      }
    },
    methods: {
      a () {
        console.log(this.user)
        console.log(this.userInfo)
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
      goToSetup () {
        console.log('Go to setup')
        router.push('/setup')
      },
      goToEdit () {
        console.log('Go to setup')
        router.push('/edit')
      }
    }
  }
</script>
