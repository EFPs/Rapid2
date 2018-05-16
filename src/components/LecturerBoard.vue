<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-layout row wrap >
        <v-flex xs12 sm12 md12 ls12>

          <h1>Your courses</h1>
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
              :items="lect"
              :search="searchCourses"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.cid }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td>{{ props.item.day }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.capacity }}</td>
                <v-btn icon class="mx-0"> <delete-icon v-on:click.native ="remove( props.item )" /> </v-btn>
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

  </v-container>
</template>

<script>
  import {auth, db} from '../firebase'
  export default {
    name: 'Sample',
    data () {
      return {
        searchCourses: '',
        headers: [{text: 'CID', sortable: true, value: 'cid'}, {text: 'Name', value: 'name'}, {text: 'Day', value: 'day'}, {text: 'Time', value: 'time'},
          {text: 'Capacity', value: 'capacity'}]
      }
    },
    mounted () {
      console.log('length' + this.all.length)
    },
    methods: {
      remove (course) {
        this.$firebaseRefs.lect.child(course['.key']).remove()
        this.$firebaseRefs.all.child(course['.key']).remove()
      }
    },
    firebase: function () {
      this.$store.dispatch('getMajor')
      return {
        courses: {
          source: db.ref('courses/' + this.major + '/all')
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
