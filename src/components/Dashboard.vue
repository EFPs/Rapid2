<template>
  <v-container grid-list-xl text-xs-center >
    <v-layout column wrap>
      <v-flex xs3 >
        <v-layout  fluid row wrap>
          <v-flex class="require" style="background-color: rgba(249, 6, 6,0.7)">
            <h1 style="color: rgb(249, 6, 6); background-color: rgba(0,0,0,0.7)" >Required Courses</h1>
            <v-card dark>
              <v-card-title>
                All {{  }} Courses.<br/>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="requiredSearch"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="requiredSearch"
                :headers="headers"
                :items="required"
                :search="requiredSearch"
                :loading="loading"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.cid }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.date }}</td>
                  <td class="text-xs-left">{{ props.item.time }}</td>
                  <v-btn v-on:click.native ="addCourses( props.item )">ADD</v-btn>
                </template>

                <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                  Your search for "{{ requiredSearch }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>

          <v-flex  class="onceAYear" style="background-color: rgba(255, 191, 0,0.7)">
            <h1 style="color: rgb(255, 191, 0); background-color: rgba(0,0,0,0.7)">Once A Year Courses</h1>
            <v-card mr-5 dark>
              <v-card-title>
                All {{  }} Courses.<br/>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="yearlySearch"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="yearlySearch"
                :headers="headers"
                :items="yearly"
                :search="yearlySearch"
                :loading="loading"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.cid }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.date }}</td>
                  <td class="text-xs-left">{{ props.item.time }}</td>
                  <v-btn v-on:click.native ="addCourses( props.item )">ADD</v-btn>
                </template>

                <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                  Your search for "{{ yearlySearch }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>

          <v-flex class="suggestBy" style="background-color: rgba(255, 255, 0,0.5); ">
            <h1 style="color: rgb(255, 255, 0); background-color: rgba(0,0,0,0.7)">Suggested By Advisor</h1>
            <v-card dark>
              <v-card-title>
                All {{  }} Courses.<br/>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="suggestSearch"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="suggestSearch"
                :headers="headers"
                :items="suggest"
                :search="suggestSearch"
                :loading="loading"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.cid }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.date }}</td>
                  <td class="text-xs-left">{{ props.item.time }}</td>
                  <v-btn v-on:click.native ="addCourses( props.item )">ADD</v-btn>
                </template>

                <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                  Your search for "{{ suggestSearch }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9>
        <h1>C2</h1>
      </v-flex>
      <v-btn @click.native="a">asdasd</v-btn>

    </v-layout>
  </v-container>

</template>

<script>
  import {db, auth} from '../firebase'
  export default{
    data () {
      return {
        user: auth.currentUser,
        headers: [ {text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}, {text: 'Date', value: 'date'}, {text: 'Time', value: 'time'} ],
        suggest: [],
        suggestSearch: '',
        all: [],
        allSearch: '',
        required: [],
        requiredSearch: '',
        yearly: [],
        yearlySearch: '',
        major: 'none'
      }
    },
    firebase () {
      return {
        userTakenCourses: db.ref('users/' + this.user.uid + '/takenCourses'),
        all: db.ref('current'),
        currentRequired: db.ref('current/required'),
        currentSuggest: db.ref('current/suggested'),
        currentYearly: db.ref('current/yearly')
      }
    },
    // beforeUpdate () {
    //   console.log(this.major)
    //   console.log(this.userInfo)
    //   if (this.major === 'none') {
    //     console.log('BUpdate')
    //     const indexMajor = this.getIndexUserInfo('major')
    //     this.major = this.userInfo[indexMajor]['.value']
    //     console.log('major', this.userInfo[indexMajor]['.value'])
    //   }
    // },
    // updated () {
    //   console.log(this.major)
    //   console.log(this.userInfo)
    //   if (this.major === 'none') {
    //     console.log('Update')
    //     const indexMajor = this.getIndexUserInfo('major')
    //     this.major = this.userInfo[indexMajor]['.value']
    //     console.log('major', this.userInfo[indexMajor]['.value'])
    //   }
    // },
    mounted () {
      console.log('Mounted')
      console.log('currentOpen ', this.currentRequired)
      console.log('taken ', this.userTakenCourses)
      console.log(this.required, this.yearly, this.suggest)
      console.log(this.currentRequired[0].prereq)
      // get require course
      let currentCourse
      for (currentCourse in this.currentRequired) {
        // See if user already taken this course
        if (this.userTakenCourses.filter(c => c.cid === currentCourse.cid).length === 0) {
          // if not, see if this course have prereq
          if (currentCourse.prereq) {
            // if have, Check if the user taken those course yet.
            const preqCourses = currentCourse.prec
            let pCourse
            let allClear = false
            for (pCourse in preqCourses) {
              allClear = true
              if (!this.userTakenCourses.some(c => c.cid === pCourse.cid)) {
                allClear = false
              }
            }
            // If all preq course taken
            if (allClear) {
              // Add to array
              this.required.push(currentCourse)
            }
          }
          // Add course
        }
      }
      // console.log(this.major)
      // console.log(this.userInfo)
      // if (this.major === 'none') {
      //   console.log('Mounted')
      //   const indexMajor = this.getIndexUserInfo('major')
      //   this.major = this.userInfo[indexMajor]['.value']
      //   console.log('major', this.major)
      // }
    },
    methods: {
      a () {
        console.log('major', this.major)
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
      }
    },
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
