<template>
  <v-container fluid>
<v-layout row wrap align-center>
    <v-layout row wrap >
      <v-flex xs12 sm12 md12 ls12>

        <h1 style="color: white; background-color: rgba(0,0,0,0.7)">List of all courses</h1>
        <v-card dark>
          <v-card-title>
            All {{  }} Courses.<br/>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchCourses"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="searchCourses"
            :headers="headers"
            :items="courses"
            :search="searchCourses"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.cid }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <v-btn v-on:click.native ="()=>{addCourse(props.item)}">Select</v-btn>
            </template>
            <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
              Your search for "{{ searchCourses }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>

      </v-flex>
    </v-layout>
  </v-layout>

    <h1 style="color: white; background-color: rgba(0,0,0,0.7)"> Selected course : {{ this.display }}</h1>
    <h2 style="color: white; background-color: rgba(0,0,0,0.7)">Choose day(s)</h2>
      <treeselect style="background: #3e2723"
        name="demo"
        :multiple=true
        :clearable=true
        :open-on-click=true
        :clear-on-select=true
        :options="days"
        :limit="5"
        :max-height="200"
        v-model="value"
      />

    <h2 style="color: white; background-color: rgba(0,0,0,0.7)">Choose time</h2>
    <treeselect
      name="demo"
      :multiple=false
      :clearable=true
      :open-on-click=true
      :clear-on-select=true
      :options="timeSelect"
      :max-height="200"
      v-model="time"
    />

    <h2 style="color: white; background-color: rgba(0,0,0,0.7)">Extra spice and everything nice</h2>
    <treeselect
      name="demo"
      :multiple=false
      :clearable=true
      :open-on-click=true
      :clear-on-select=true
      :options="suggested"
      :max-height="200"
      v-model="sg"
    />

    <h2 style="color: white; background-color: rgba(0,0,0,0.7)">On a scale of 1 to 5, what's the workload level</h2>
    <treeselect
      name="demo"
      :multiple=false
      :clearable=true
      :open-on-click=true
      :clear-on-select=true
      :options="workload"
      :max-height="200"
      v-model="wl"
    />


    <v-flex class="text-xs-center" mt-5>
      <v-btn large color="primary" type="submit" @click.native.stop="dialog = true">confirm</v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">You're about to add {{this.selectedCourse.name}}</v-card-title>
          <v-card-text> text </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" flat="flat" v-on:click="confirm">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>

  </v-container>

</template>



<script>
  import {auth, db} from '../firebase'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import router from '../router'

  export default {
    name: 'board',
    components: { Treeselect },
    data () {
      return {
        user: auth.currentUser,
        major: this.$store.state.major,
        display: '',
        dialog: false,
        cname: '',
        time: '',
        sg: '',
        wl: 0,
        searchCourses: '',
        searchTaken: '',
        selectedCourse: {
          cid: '',
          name: 'not select yet',
          credits: '',
          day: [],
          prec: [],
          prereq: false,
          time: '',
          suggested: '',
          workload: 0,
          lecturer: ''
        },
        courses: [],
        headers: [{text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'Name'}],
        added: false,
        value: null,
        days: [{
          id: 'Monday',
          label: 'Monday'
        }, {
          id: 'Tuesday',
          label: 'Tuesday'
        }, {
          id: 'Wednesday',
          label: 'Wednesday'
        }, {
          id: 'Thursday',
          label: 'Thursday'
        }, {
          id: 'Friday',
          label: 'Friday'
        }, {
          id: 'Saturday',
          label: 'Saturday'
        }, {
          id: 'Sunday',
          label: 'Sunday'
        }],
        workload: [{
          id: 1,
          label: 'Meh+'
        }, {
          id: 2,
          label: 'Kinda easy'
        }, {
          id: 3,
          label: 'OK'
        }, {
          id: 4,
          label: 'Rough'
        }, {
          id: 5,
          label: 'No life'
        }],
        suggested: [{
          id: 'Required',
          label: 'Required'
        }, {
          id: 'Suggested by advisor',
          label: 'Suggested by advisor'
        }, {
          id: 'Once a year',
          label: 'Once a year'
        }, {
          id: '',
          label: 'None'
        }],
        timeSelect: [{
          id: '2',
          label: 'Two hour',
          children: [{
            id: '8:00 - 10:00',
            label: '8:00 - 10:00'
          }, {
            id: '10:00 - 12:00',
            label: '10:00 - 12:00'
          }, {
            id: '12:00 - 14:00',
            label: '12:00 - 14:00'
          }, {
            id: '14:00 - 16:00',
            label: '14:00 - 16:00'
          }, {
            id: '16:00 - 18:00',
            label: '18:00 - 20:00'
          } ]
        }, {id: '4',
          label: 'Four hour',
          children: [{
            id: '8:00 - 12:00',
            label: '8:00 - 12:00'
          }, {
            id: '12:00 - 16:00',
            label: '16:00 - 20:00'
          }, {
            id: '16:00 - 20:00',
            label: '16:00 - 20:00'
          }]
        }]
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
    methods: {
      getMajor () {
        console.log('in get major')
        return db.ref('lecturers/' + auth.currentUser.uid)
          .once('value').then(function (snapshot) {
            console.log(snapshot.val().major.toLowerCase())
            return snapshot.val().major.toLowerCase()
          })
      },
      addCourse (course) {
        console.log(course)
        console.log(this.selectedCourse)
        this.selectedCourse.name = course.name
        this.selectedCourse.cid = course.cid
        this.selectedCourse.credits = course.credits
        this.cname = course.name
        if (typeof course.prereq === 'undefined') {
          // console.log('undefined from if ')
          var found = false
          let a
          for (a = 0; a < this.prereq.length; a++) {
            if (this.prereq[a]['.key'] === course.cid) {
              found = true
              this.selectedCourse.prec = this.prereq[a].condition
              console.log(this.selectedCourse.prec)
            }
          }
          this.selectedCourse.prereq = found
        } else {
          this.selectedCourse.prereq = course.prereq
          this.selectedCourse.prec = course.prec
        }
      },
      confirm () {
        // TODO: Add capacity num, and save course using the same PID
        this.selectedCourse.time = this.time
        this.selectedCourse.day = this.value
        this.selectedCourse.suggested = this.sg
        this.selectedCourse.workload = this.wl
        this.selectedCourse.lecturer = auth.currentUser.displayName
        console.log(this.selectedCourse)
        db.ref('lecturers/' + auth.currentUser.uid + '/courses').push(
          this.selectedCourse)
        if (this.selectedCourse.suggested === 'Required') {
          db.ref('current/required').push(
            this.selectedCourse)
        } else if (this.selectedCourse.suggested === 'Suggested by advisor') {
          db.ref('current/suggested').push(
            this.selectedCourse)
        } else if (this.selectedCourse.suggested === 'Once a year') {
          db.ref('current/yearly').push(
            this.selectedCourse)
        }
        db.ref('current/all').push(
          this.selectedCourse)
        this.dialog = false
        router.push('/lectureraddcourse')
      }
    },
    firebase: function () {
      this.$store.dispatch('getMajor')
      console.log(this.$store.state.major)
      return {
        courses: {
          source: db.ref('courses/' + this.$store.state.major + '/all')
        },
        lect: {
          source: db.ref('lecturers/' + auth.currentUser.uid)
        },
        prereq: {
          source: db.ref('prereq/' + this.major)
        }
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
      },
      cname: function () {
        console.log('watching.....')
        this.display = this.cname
      },
      value: function () {
        console.log(this.value)
      },
      time: function () {
        console.log(this.time)
      }
    }
  }
</script>

<style scoped>

</style>
