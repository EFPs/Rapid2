<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
        <h1>Please add all the courses that you have taken up to this point</h1><br/>
        <h2>This will be use to calculate the next course that you should take </h2><br/>
      </v-flex>

    </v-layout>
    <!--<h1>R2</h1>-->
    <v-layout row wrap align-center>
      <v-layout column wrap >
        <v-flex xs6 sm6 md6 ls6>

          <h1>List of all courses</h1>
          <v-card>
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
                <v-btn v-on:click.native ="addCourses( props.item.cid, props.item.name )">ADD</v-btn>
              </template>
              <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                Your search for "{{ searchCourses }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <!--<v-layout column>-->
        <!--<v-flex xs0 sm0.5 md0 ls1></v-flex>-->
      <!--</v-layout>-->
      <v-layout column wrap>
        <v-flex xs6 sm6 md6 ls6>

          <h1>Added Courses</h1>

          <v-card>
            <v-card-title>
              Added {{  }} Courses.
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
              :items="takenCourses"
              :search="searchTaken"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.cid }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <v-btn v-on:click.native ="removeTaken( props.item.cid, props.item.name )">REMOVE</v-btn>
              </template>
              <v-alert slot= 'no-results' :value="true" color="error" icon="warning">
                Your search for "{{ searchTaken }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
      </v-layout>
        <!--<v-btn v-bind:onclick="this.a">a</v-btn>-->
    </v-layout>
    <v-layout row>
      <v-flex xs="10">

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-btn block color="success"> CONFIRM </v-btn>
    </v-layout>
  </v-container>
</template>


<script>
  import {db, auth} from '../firebase'
  export default {
    data () {
      return {
        searchCourses: '',
        searchTaken: '',
        courses: {},
        takenCourses: [],
        // courses: db.ref('demoCourses/'),
        headers: [{text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}]
      }
    },
    firebase: {
      courses: {
        source: db.ref('demoCourses'),
        // target: db.ref('users/' + auth.currentUser.uid + '/takenCourses')
      }
    },
    methods: {
      removeTaken (cid, name) {
        console.log('Remove', cid, name)
        const index = this.takenCourses.indexOf(this.takenCourses.filter(c => c.cid === cid).pop())
        // console.log('index', index)
        // console.log(this.takenCourses)
        this.takenCourses.splice(index, 1)
        // console.log(this.takenCourses.indexOf({cid, name}))
        // console.log(this.takenCourses)
      },
      addCourses (cid, name) {
        console.log(this.courses)
        if (this.takenCourses.filter(c => c.cid === cid).pop()) {
          window.alert('You already added this course')
        } else {
          console.log('Add', cid, name)
          this.takenCourses.push(this.courses.filter(c => c.cid === cid).pop())
        }
      },
      confirm () {
        if (window.confirm()) {
          // this.target.
        }
      }
    },
    // Defind new variable
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
