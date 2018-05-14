<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center" style="background-color: rgba(0,0,0,0.3)">
        <br/>
        <h1 style="color: white;">Welcome {{ user.displayName }} !</h1>
        <h1 style="color: white;">Please add all the courses that you have taken up to this point.</h1>
        <h2 style="color: white;">This will be use to calculate the next course that you should take. </h2><br/>
      </v-flex>

    </v-layout>
    <!--<h1>R2</h1>-->
    <v-layout col wrap align-center>
        <v-flex xs12 sm12 md12 ls12>

          <h1 style="color: darkorange; background-color: rgba(0,0,0,0.6)">List of all courses</h1>
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
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.cid }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <v-btn v-on:click.native ="addCourses( props.item )">ADD</v-btn>
              </template>

              <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                Your search for "{{ searchCourses }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
      <!--<v-spacer xs1></v-spacer>-->
      <!--<v-layout column>-->
        <!--<v-flex xs0 sm0.5 md0 ls1></v-flex>-->
      <!--</v-layout>-->
        <v-flex xs12 sm12 md12 ls12>

          <h1 style="color: darkorange; background-color: rgba(0,0,0,0.6)"> Taken Courses </h1>

          <v-card dark>
            <v-card-title>
              Taken {{  }} Courses.
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchTaken"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="searchTaken"
              :headers="headers"
              :items="target"
              :search="searchTaken"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.cid }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <v-btn v-on:click.native ="removeTaken(props.item, props.item.cid, props.item.name )">REMOVE</v-btn>
              </template>
              <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                Your search for "{{ searchTaken }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs="10">

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-btn block color="success" v-on:click.native="confirm"> CONFIRM </v-btn>
    </v-layout>
  </v-container>
</template>


<script>
  import {db, auth} from '../firebase'
  import router from '../router'

  export default {
    data () {
      return {
        loading: true,
        user: auth.currentUser,
        // user: this.$store.getters.getUser,
        // user: auth.currentUser,
        searchCourses: '',
        searchTaken: '',
        courses: {},
        headers: [{text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}]
      }
    },
    beforeUpdate () {
      if (this.loading) {
        this.loading = false
      }
    },
    firebase: function () {
      return {
        courses: {
          source: db.ref('courses/all')
        },
        target: {
          // source: db.ref('users/lR9nVGtLfZfPFk4YKwZlAyJJl743/takenCourses/')
          // source: db.ref('users/' + auth.currentUser.uid.toString() + '/takenCourses')
          source: db.ref('users/' + this.user.uid.toString() + '/takenCourses')
        }
      }
    },
    methods: {
      removeTaken (course) {
        console.log(this.target)
        console.log('Remove', course.cid, course.name)
        this.$firebaseRefs.target.child(course['.key']).remove()
      },
      addCourses (course) {
        console.log(this.target)
        if (this.target.filter(c => c.cid === course.cid).pop()) {
          window.alert('You already added this course')
        } else {
          console.log('Add', course.cid, course.name)
          // TODO: IF NEEDED, ADD prereq
          this.$firebaseRefs.target.child(course['.key']).set({cid: course.cid, name: course.name, credits: course.credits})
        }
      },
      confirm () {
        // console.log('ref', 'users/' + auth.currentUser.uid.toString() + '/takenCourses')
        console.log('target', this.target)
        if (window.confirm('Confirm changes? \n(You can come back later)')) {
          router.push('/home')
        }
      }
    },
    // Defind new variable
    computed: {
      onAuthStateChanged () {
        router.push('/setup')
      },
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
