<template>
  <v-container>
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
                  <td>{{ props.item.students !== undefined ? props.item.students.length : 0 }}</td>
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
                  <td>{{ props.item.students !== undefined ? props.item.students.length : 0 }}</td>
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
                  <td>{{ props.item.students !== undefined ? props.item.students.length : 0 }}</td>
                  <v-btn v-on:click.native ="addCourses( props.item )">ADD</v-btn>
                </template>

                <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                  Your search for "{{ suggestSearch }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">{{this.errorM}}</v-card-title>
              <v-card-actions>
                <v-btn color="secondary" flat @click.native="dialog = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
      <v-flex xs9>
        <div style="background-color: rgba(6, 128, 249,0.7)">
        <h2 style="color: white; ">Search All Available Courses</h2>
        <v-select
          max-height=200
          style="background-color: rgba(0,0,0,0.7)"
          dark
          :items="all"
          :filter="allFilter"
          v-model="allChosen"
          label="Select available course by ID or by name."
          item-text="name"
          autocomplete
        ></v-select>
          <v-btn @click.native="() => {addCourses(allChosen)}" medium color="success" dark>ADD</v-btn>
        </div>
        <div style="background-color: rgba(6, 128, 249,0.7)">
          <h2 style="color: white; ">Search All Available Courses</h2>
          <v-select
            max-height=200
            style="background-color: rgba(0,0,0,0.7)"
            dark
            :items="addedCourses"
            :filter="addedFilter"
            v-model="addedChosen"
            label="Select available course by ID or by name."
            item-text="name"
            autocomplete
          ></v-select>
          <v-btn @click.native="() => {removeCourses(addedChosen['.key'])}" medium color="error" dark>Remove</v-btn>
        </div>
        <!---->
        <!---->
        <!--:array = this.addedCourses-->
      </v-flex>

      <!--<v-btn @click.native="a">asdasd</v-btn>-->
      <!--<v-btn @click.native="b">asdasd</v-btn>-->

    </v-layout>
  </v-container>
    <v-container>
      <div
        id="e3"
        class="grey lighten-3"
      >
        <v-toolbar color="red accent-2">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">My Class next term (Click on the box to drop off such course)</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!--<v-card>-->
        <v-container
          align-center
          text-xs-center
        >
          <v-layout row wrap>
            <v-flex xs12 >

              <v-layout >
                <v-flex class="my-flex" v-for="day in days" :key="day.id">
                  <v-card dark class="white--text">
                    <v-card-text class="px-0">
                      {{ day.title }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>



              <v-flex  xs12  v-for="time in times" :key="time.id">

                <v-layout row wrap>

                  <v-flex class="my-flex" >
                    <v-card dark class="white--text">
                      <v-card-text class="px-0">
                        {{time.start}} - {{time.end}}
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex class="my-flex" v-for="index in 7">
                    <v-card  v-on:click.native="a" dark class="white--text">
                      <v-card-text class="px-0">
                        {{nestedlist[time.id][index-1]}}
                      </v-card-text>
                    </v-card>
                  </v-flex>


                </v-layout>

              </v-flex>

            </v-flex>

          </v-layout>
        </v-container>

        <!--</v-card>-->
      </div>
    </v-container>
  </v-container>
</template>

<script>
  import {db, auth} from '../firebase'
  // import ItemTemplate from './ItemTemplate.vue'
  export default{

    data () {
      return {
        // template: ItemTemplate,
        dialog: false,
        errorM: '',
        user: auth.currentUser,
        headers: [ {text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}, {text: 'Date', value: 'day'}, {text: 'Time', value: 'time'}, {text: 'Free space', value: ''} ],
        suggestSearch: '',
        all: [],
        allChosen: null,
        addedChosen: '',
        requiredSearch: '',
        yearlySearch: '',
        major: 'none',
        workLoadLv: 0,
        register: [],
        days: [
          {
            'id': 0,
            'title': 'Day'
          }, {
            'id': 1,
            'title': 'Monday'
          }, {
            'id': 2,
            'title': 'Tuesday'
          }, {
            'id': 3,
            'title': 'Wednesday'
          }, {
            'id': 4,
            'title': 'Thursday'
          }, {
            'id': 5,
            'title': 'Friday'
          }, {
            'id': 6,
            'title': 'Saturday'
          }, {
            'id': 7,
            'title': 'Sunday'
          }
        ],
        times: [
          {
            'id': 0,
            'start': '08:00',
            'end': '10:00'
          }, {
            'id': 1,
            'start': '10:00',
            'end': '12:00'
          }, {
            'id': 2,
            'start': '12:00',
            'end': '14:00'
          }, {
            'id': 3,
            'start': '14:00',
            'end': '16:00'
          }, {
            'id': 4,
            'start': '16:00',
            'end': '18:00'
          }, {
            'id': 5,
            'start': '18:00',
            'end': '20:00'
          }
        ],
        // time: '10:00 - 12:00',
        // fakeData: [
        //   {
        //     date: ['Thursday,Friday'],
        //     time: '10:00 - 12:00',
        //     cid: 'ICCS105'
        //   }
        // ],
        dateToIndex: {
          Monday: 0,
          Tuesday: 1,
          Wednesday: 2,
          Thursday: 3,
          Friday: 4,
          Saturday: 5,
          Sunday: 6
        }
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
      a () {
        console.log(this.addedCourses)
      },
      b () {
        this.removeCourses('-LCh13zTxfbb02UUAHEr')
      },
      allFilter (item, queryText, itemText) {
        // console.log(item, queryText, itemText)
        const hasValue = val => val != null ? val : ''
        const textCID = hasValue(item.cid)
        const textName = hasValue(item.name)
        const query = hasValue(queryText)
        let accept = textCID.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
        accept = (accept || textName.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1)
        return accept
      },
      addedFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const textCID = hasValue(item.cid)
        const textName = hasValue(item.name)
        const query = hasValue(queryText)
        let accept = textCID.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
        accept = (accept || textName.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1)
        return accept
      },
      removeCourses (courseKey) {
        // const course = this.all.filter(c => c.cid === cid).pop()
        // Remove from all
        const courseIndexInAll = this.getIndexByKey(this.all, courseKey)
        const courseIsOpen = this.all[courseIndexInAll].open
        const listWithoutMe = this.all[courseIndexInAll].students.filter(c => c !== auth.currentUser.displayName)
        console.log('with me', this.all[courseIndexInAll].students)
        console.log('with out me', listWithoutMe.length)
        if (listWithoutMe.length === 0) {
          this.$firebaseRefs.all.child(courseKey).child('students').set(listWithoutMe)
          console.log('Delete user from ', courseKey)
          if (!courseIsOpen) {
            console.log('Last student out, deleting course')
            this.$firebaseRefs.all.child(courseKey).remove()
          }
        } else {
          this.$firebaseRefs.all.child(courseKey).child('students').set(listWithoutMe)
          console.log('Delete user from ', courseKey)
        }
        // Remove from register
        let course = this.register.filter(c => c['.value'] === courseKey)
        console.log('object that have key of ', courseKey)
        for (let i in course) {
          this.$firebaseRefs.register.child(course[i]['.key']).remove()
          console.log('Remove course in user/regis')
        }
      },
      addCourses (c) {
        if (c !== null) {
          let temp = []
          // TODO CHeck free space
          if (typeof c.students === 'undefined') {
            temp.push(auth.currentUser.displayName)
            this.$firebaseRefs.all.child(c['.key']).child('students').set(temp)
          } else {
            if (c.students.length === c.capacity) {
              this.dialog = true
              this.errorM = 'The course is full'
              return
            } else if (this.courseAlreadyAdded(this.register, c['.key'])) {
              this.dialog = true
              this.errorM = 'You already added this course'
              return
            } else if (this.courseOverlap(this.register, c)) {
              console.log('oh, you didn\'t lie')
              this.dialog = true
              this.errorM = 'Time overlap with course(s) you chose'
              return
            }
            c.open = true
            console.log(c)
            const plz = c['.key']
            db.ref('current/all/' + c['.key']).once('value').then(function (snapshot) {
              console.log(snapshot.val().cid)
              console.log(snapshot.val().students)
              temp = snapshot.val().students
              // console.log(c['.key'])
            }).then(
              () => {
                // console.log('temp boys', temp)
                temp.push(auth.currentUser.displayName)
                // console.log('temp after push', temp)
                // console.log(plz)
                this.$firebaseRefs.all.child(plz).child('students').set(temp)
              }
            )
          }
          db.ref('users/' + this.user.uid + '/register/' + c.cid).set(c['.key'])
          // db.ref('users/' + this.user.uid + '/register/' + c.cid).set({time: c.time, day: c.day, workload: c.workload, open: c.open, cid: c.cid, name: c.name})
        } else {
          console.log('attempting to add empty object')
        }
      },
      courseAlreadyAdded (courseList, courseKey) {
        // return true
        console.log('Course List', courseList)
        return courseList.some(c => c['.value'] === courseKey)
      },
      courseOverlap (courseList, course) {
        // return true
        // console.log('Course List', courseList)
        let tempTime
        let tempDay
        for (let i = 0; i < this.all.length; i++) {
          tempTime = this.all[i].time
          tempDay = this.all[i].day
          for (let j = 0; j < tempDay.length; j++) {
            if (tempDay[j] === course.day[0] || tempDay[j] === course.day[1]) {
              console.log('found dups', tempDay[j], course.day[0], course.day[1])
              for (let h = 0; h < tempTime.length; h++) {
                if (tempTime[h] === course.time[0] || tempTime[h] === course.time[1]) {
                  console.log('found dups', tempTime[h], course.time[0], course.time[1])
                  return true
                }
              }
            }
          }
        }
        return false
        // for (let i = 0; i < courseList.length; i++) {
        //   db.ref('current/all/' + courseList[i]['.value']).on('value').then(function (snapshot) {
        //     tempTime = snapshot.val().time
        //     tempDay = snapshot.val().day
        //     // console.log(c['.key'])
        //     console.log('Day Time', tempTime, tempDay)
        //     console.log('Course', course)
        //   }).then(
        //     () => {
        //       for (let j = 0; j < tempDay.length; j++) {
        //         if (tempDay[j] === course.day[0] || tempDay[j] === course.day[1]) {
        //           console.log('found dups', tempDay[j], course.day[0], course.day[1])
        //           for (let h = 0; h < tempTime.length; h++) {
        //             if (tempTime[h] === course.time[0] || tempTime[h] === course.time[1]) {
        //               console.log('found dups', tempTime[h], course.time[0], course.time[1])
        //               return true
        //             }
        //           }
        //         }
        //       }
        //       console.log('you lie to me')
        //       return false
        //     }
        //   )
        // }
        // return true
        // console.log('you lie to me')
        // return ret
      },
      setDisplayArray () {
        let r = []
        let y = []
        let s = []
        // get require course
        let currentCourse
        let indexP
        let userTakenP = false
        for (let indexC = 0; indexC < this.all.length; indexC++) {
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
              if (currentCourse.type === 'Required') {
                console.log('type Required')
                r.push(currentCourse)
              } else if (currentCourse.type === 'Suggested by advisor') {
                console.log('type Suggested by adviser')
                s.push(currentCourse)
              } else if (currentCourse.type === 'Once a year') {
                console.log('type Once a year')
                y.push(currentCourse)
              } else {
                console.log('Course existed in list')
              }
            }
          }
          // console.log('User taken this course already')
        }
        console.log('All courses considered')
        console.log('s', s)
        return [r, y, s]
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
      getIndexByKey (array, key) {
        let i = 0
        for (i = 0; i < array.length; i++) {
          // console.log(this.userInfo[i]['.key'])
          if (array[i]['.key'] === key) {
            return i
          }
        }
        return -1
      },
      getIndexByValue (array, key) {
        let i = 0
        for (i = 0; i < array.length; i++) {
          // console.log(this.userInfo[i]['.key'])
          if (array[i]['.value'] === key) {
            return i
          }
        }
        return -1
      },
      getAddedCourse () {
        let addedList = []
        let eachCourse
        for (let eachIndex in this.all) {
          eachCourse = this.all[eachIndex]
          console.log(this.all, eachCourse)
          if (this.register.some(c => c['.value'] === eachCourse['.key'])) {
            if (!eachCourse.open) {
              this.dialogClose = true
              this.closedName = eachCourse.cid + ' ' + eachCourse.name
              this.removeCourses(eachCourse['.key'])
            }
            addedList.push(eachCourse)
          }
        }
        return addedList
      }
    },
    computed: {
      error () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      },
      bigArray () {
        return this.setDisplayArray()
      },
      required () {
        return this.bigArray[0]
      },
      yearly () {
        return this.bigArray[1]
      },
      suggest () {
        return this.bigArray[2]
      },
      addedCourses () {
        return this.getAddedCourse()
      },
      nestedlist () {
        let temp = [['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.']]
        for (let i = 0; i < this.addedCourses.length; i++) {
          for (let y = 0; y < this.addedCourses[i].time.length; y++) {
            let temptime = (((parseInt(this.addedCourses[i].time[y].substring(0, this.addedCourses[i].time[y].indexOf(':')))) - 8) / 2)
            for (let j = 0; j < this.addedCourses[i].day.length; j++) {
              let dateIndex = this.dateToIndex[this.addedCourses[i].day[j]]
              temp[temptime][dateIndex] = this.addedCourses[i].cid
            }
          }
        }
        return temp
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

<style scoped>
  .my-flex{
    padding: 0px;
    width: 100px;
    margin-bottom: 0;
    margin-left: 1px;
    margin-right: 1px;
    margin-top: 0;
    color: lightblue;
  }
</style>
