<template>
  <v-container fluid>
<v-layout row wrap align-center>
    <v-layout row wrap >
      <v-flex xs12 sm12 md12 ls12>

        <h3 style="color: white; background-color: rgba(0,0,0,0.7)">List of all courses</h3>
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

    <h2 style="color: white; background-color: rgba(0,0,0,0.7)"> Selected course : {{ this.display }}</h2>
    <h3 style="color: white; background-color: rgba(0,0,0,0.7)">Choose day(s)</h3>
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

    <h4 style="color: white; background-color: rgba(0,0,0,0.7)">Choose time</h4>
    <treeselect
      name="demo"
      :multiple=false
      :clearable=true
      :open-on-click=true
      :clear-on-select=true
      :options="timeSelect"
      :max-height="200"
      v-model="time"
      dark
    />

    <h3 style="color: white; background-color: rgba(0,0,0,0.7)">Extra spice and everything nice</h3>
    <treeselect
      name="demo"
      :multiple=false
      :clearable=true
      :open-on-click=true
      :clear-on-select=true
      :options="type"
      :max-height="200"
      v-model="sg"
    />

    <h3 style="color: white; background-color: rgba(0,0,0,0.7)">On a scale of 1 to 5, what's the workload level</h3>
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

    <v-form @submit.prevent="confirm">
    <v-layout column :style="{'background-color': 'rgba(0,0,0,0.5)', 'border-radius': '15px'}">
      <v-flex >
        <v-text-field
          name="course capacity"
          label="Course capacity"
          v-model="cap"
          id="cap"
          dark
          color="primary"
          required></v-text-field>
      </v-flex>

    </v-layout>
    </v-form>
    <v-flex class="text-xs-center" mt-5>
      <v-btn large color="primary" type="submit" @click.native.stop="dialog = true"
             :loading="loading"
             :disabled="loading">confirm</v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">You're about to add {{this.selectedCourse.name}}</v-card-title>
          <v-card-text> Please double check all the fields before submit </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Let me check again</v-btn>
            <v-btn color="green darken-1" flat="flat" v-on:click="confirm">Publish</v-btn>
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
        cap: 0,
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
          type: '',
          workload: 0,
          lecturer: '',
          capacity: 0,
          open: true
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
        type: [{
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
            id: ['8:00 - 10:00'],
            label: '8:00 - 10:00'
          }, {
            id: ['10:00 - 12:00'],
            label: '10:00 - 12:00'
          }, {
            id: ['12:00 - 14:00'],
            label: '12:00 - 14:00'
          }, {
            id: ['14:00 - 16:00'],
            label: '14:00 - 16:00'
          }, {
            id: ['16:00 - 18:00'],
            label: '18:00 - 20:00'
          } ]
        }, {id: '4',
          label: 'Four hour',
          children: [{
            id: ['8:00 - 10:00', '10:00 - 12:00'],
            label: '8:00 - 12:00'
          }, {
            id: ['12:00 - 14:00', '14:00 - 16:00'],
            label: '12:00 - 16:00'
          }, {
            id: ['16:00 - 18:00', '18:00 - 20:00'],
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
    mounted () {
    },
    methods: {
      getMajor () {
        return db.ref('lecturers/' + auth.currentUser.uid)
          .once('value').then(function (snapshot) {
            console.log(snapshot.val().major.toLowerCase())
            return snapshot.val().major.toLowerCase()
          })
      },
      addCourse (course) {
        this.selectedCourse.name = course.name
        this.selectedCourse.cid = course.cid
        this.selectedCourse.credits = course.credits
        this.cname = course.name
        if (typeof course.prereq === 'undefined') {
          var found = false
          let a
          for (a = 0; a < this.prereq.length; a++) {
            if (this.prereq[a]['.key'] === course.cid) {
              found = true
              this.selectedCourse.prec = this.prereq[a].condition
            }
          }
          this.$firebaseRefs.courses.child(course['.key']).update({
            'prereq': found,
            'prec': this.selectedCourse.prec}
          )
          this.$firebaseRefs.all.child(course['.key']).update({
            'prereq': found,
            'prec': this.selectedCourse.prec}
          )
          this.selectedCourse.prereq = found
        } else {
          if (typeof course.prec === 'undefined') {
            this.selectedCourse.prereq = course.prereq
            this.selectedCourse.prec = []
          } else {
            this.selectedCourse.prereq = course.prereq
            this.selectedCourse.prec = course.prec
          }
        }
      },
      confirm () {
        this.selectedCourse.capacity = parseInt(this.cap)
        this.selectedCourse.time = this.time
        this.selectedCourse.day = this.value
        this.selectedCourse.type = this.sg
        this.selectedCourse.workload = this.wl
        this.selectedCourse.lecturer = auth.currentUser.displayName
        this.dialog = false
        const key = db.ref('current/all').push(this.selectedCourse).getKey()
        db.ref('lecturers/' + auth.currentUser.uid + '/courses/' + key).set(
          key)
        router.push('/lectureraddcourse')
        this.reset()
      },
      reset () {
        this.selectedCourse.cid = ''
        this.selectedCourse.credits = ''
        this.selectedCourse.day = []
        this.selectedCourse.prec = []
        this.selectedCourse.prereq = false
        this.selectedCourse.time = ''
        this.selectedCourse.type = ''
        this.selectedCourse.workload = 0
        this.selectedCourse.lecturer = ''
        this.selectedCourse.capacity = 0
      }
    },
    firebase: function () {
      this.$store.dispatch('getMajor')
      return {
        courses: {
          source: db.ref('courses/' + this.$store.state.major + '/all')
        },
        all: {
          source: db.ref('courses/all')
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
      },
      errmsg: function () {
        console.log(this.errmsg)
      },
      'this.selectedCourse': function (newVal, oldVal) {
        console.log(this.selectedCourse)
      }
    }
  }
</script>

<style scoped>

</style>
