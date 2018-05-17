<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-layout row wrap >
        <v-flex xs12 sm12 md12 ls12>

          <h3 style="color: white; background-color: rgba(0,0,0,0.7)">Your courses</h3>
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
              :items="lectcourse"
              :search="searchCourses"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.cid }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td>{{ props.item.day }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.capacity }}</td>
                <td>{{ props.item.students !== undefined ? props.item.students.length : 0 }}</td>
                <v-btn icon class="mx-0" @click.native.stop="dialog = true; studentsList = props.item.students"> <folder-account-icon /> </v-btn>
                <v-btn icon class="mx-0"> <delete-icon v-on:click.native ="remove( props.item )" /> </v-btn>
              </template>
              <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                Your search for "{{ searchCourses }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
      </v-layout>
    </v-layout>


    <v-layout row justify-center>
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <v-card>
          <v-card-title>Preregistered students</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="student in studentsList" >
              <v-list-tile-content v-text="student"> </v-list-tile-content>
            </v-list-tile>
            </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <div class="text-xs-center">
            <v-btn class="align-end" color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


    <!--<cal></cal>-->

  </v-container>

</template>

<script>
  import {auth, db} from '../firebase'
  // import cal from './calendar'
  export default {
    name: 'Sample',
    // components: { cal },
    data () {
      return {
        dialog: false,
        all: [],
        lect: [],
        studentsList: [],
        searchCourses: '',
        headers: [{text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}, {text: 'Day', value: 'day'}, {text: 'Time', value: 'time'},
          {text: 'Capacity', value: 'capacity'}, {text: 'Taken', value: 'taken'}]
      }
    },
    mounted () {
      let temp = []
      for (let l = 0; l < this.all.length; l++) {
        // console.log('looping: ', this.all[l]['.key'])
        for (let j = 0; j < this.lect.length; j++) {
          // console.log(this.lect[j])
          if (this.lect[j]['.value'] === this.all[l]['.key']) {
            console.log('found key :', this.all[l]['.key'])
            console.log(this.all[l])
            // const key = this.all[l]['.key']
            temp.push(this.all[l])
          }
        }
      }
      this.lectcourse = temp
    },
    computed: {
      lectcourse () {
        return this.update()
      }
    },
    methods: {
      showlist (course) {
        if (typeof course.students === 'undefined') {
        }
      },
      remove (course) {
        this.$firebaseRefs.lect.child(course['.key']).remove()
        console.log('after delete')
        db.ref('current/all/' + course['.key']).update({open: false})
        // this.$firebaseRefs.all.child(course['.key']).remove()
      },
      update () {
        let temp = []
        console.log(this.all)
        for (let l = 0; l < this.all.length; l++) {
          // console.log('looping: ', this.all[l]['.key'])
          for (let j = 0; j < this.lect.length; j++) {
            // console.log(this.lect[j])
            if (this.lect[j]['.value'] === this.all[l]['.key']) {
              console.log('found key :', this.all[l]['.key'])
              console.log(this.all[l])
              // const key = this.all[l]['.key']
              temp.push(this.all[l])
            }
          }
        }
        return temp
      }
    },
    watch: {
      studentsList: function () {
        // console.log(this.studentsList)
        // console.log(this.studentsList.length)
      }
    },
    firebase: function () {
      this.$store.dispatch('getMajor')
      return {
        courses: {
          source: db.ref('courses/' + this.$store.state.major + '/all')
        },
        lect: {
          source: db.ref('lecturers/' + auth.currentUser.uid + '/courses')
        },
        all: {
          source: db.ref('current/all')
        }
      }
    }
  }
</script>

<style scoped>
</style>
