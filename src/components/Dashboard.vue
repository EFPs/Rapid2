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
                  <td class="text-xs-left">{{ props.item.day }}</td>
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
                  <td class="text-xs-left">{{ props.item.day }}</td>
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
                  <td class="text-xs-left">{{ props.item.day }}</td>
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
<!---->

<!---->
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
        headers: [ {text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}, {text: 'Date', value: 'day'}, {text: 'Time', value: 'time'} ],
        suggest: [],
        suggestSearch: '',
        all: [],
        allSearch: '',
        required: [],
        requiredSearch: '',
        yearly: [],
        yearlySearch: '',
        major: 'none',
        workLoadLv: 0,
        register: []
      }
    },
    firebase: function () {
      return {
        userTakenCourses: {
          source: db.ref('users/' + this.user.uid + '/takenCourses')
        },
        all: {
          source: db.ref('current/all')
        },
        register: {
          source: db.ref('users/' + this.user.uid + '/register')
        }
      }
    },
    methods: {
      removeCourses (c){

      },
      addCourses (c) {
        c.open = true
        delete c['.key']
        db.ref('users/' + this.user.uid + '/register/' + c.cid).set(c)
      },
      courseExists (courseList, course) {
        // return true
        return courseList.some(c => c.cid === course.cid)
      },
      setDisplayArray () {
        // get require course
        let currentCourse
        let indexC
        let indexP
        let userTakenP = false
        for (indexC = 0; indexC < this.all.length; indexC++) {
          currentCourse = this.all[indexC]
          console.log('Course ', currentCourse)
          // See if user already taken this course
          if (this.userTakenCourses.filter(c => c.cid === currentCourse.cid).length === 0) {
            // if not, see if this course have prereq
            console.log('this course have prereq ? ', currentCourse.prereq)
            if (currentCourse.prereq) {
              // if have, Check if the user taken those course yet.
              const preqCourses = currentCourse.prec
              let pCourse
              for (indexP in preqCourses) {
                pCourse = preqCourses[indexP]
                console.log('prereq Course : ', pCourse)
                if (this.userTakenCourses.some(c => c.cid === pCourse)) {
                  userTakenP = true
                  console.log('user taken prereq', userTakenP)
                }
              }
              // If all preq course taken
            }
            if (userTakenP || !currentCourse.prereq) {
              // Add to array
              console.log('All clear Add course', currentCourse)
              if (currentCourse.type === 'Required' && !this.courseExists(this.required, currentCourse)) {
                console.log('type Required')
                this.required.push(currentCourse)
              } else if (currentCourse.type === 'Suggested by advisor' && !this.courseExists(this.suggest, currentCourse)) {
                console.log('type Suggested by adviser')
                this.suggest.push(currentCourse)
              } else if (currentCourse.type === 'Once a year' && !this.courseExists(this.yearly, currentCourse)) {
                console.log('type Once a year')
                this.yearly.push(currentCourse)
              } else {
                console.log('Course existed in list')
              }
            }
          }
          // console.log('User taken this course already')
        }
        // console.log('All courses considered')
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
      register () {
        console.log('Changes in Register')
        // let indexC
        // for (indexC in this.register) {
        //   const course = this.register[indexC]
        //   if (!course.open) {
        //     window.alert(course.cid + course.name + ' has been cancel by the lecturer.')
        //     this.$firebaseRefs.register.child(course.cid).remove()
        //   }
        // }
      },
      all () {
        console.log(this.all)
        console.log('Changes in All')
        if (this.all !== 'undefined') {
          this.setDisplayArray()
        }
      },
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
