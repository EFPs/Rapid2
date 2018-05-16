<template>

  <v-app :style="{ 'background-image': 'url(' + img + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat'  }">
    <v-navigation-drawer dark v-model="sidebar" app :style="{ 'background-color': 'gray', 'opacity': '0.8' }">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="userSignOut" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="primary">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>

</template>

<script>
  import {auth, db} from './firebase'
  export default {
    data () {
      return {
        img: 'static/kym-ellis-662656-unsplash.jpg',
        img2: 'static/mt-cook.jpg',
        img3: 'static/mike-wilson-263697-unsplash.jpg',
        img4: 'static/aman-dhakal-205796-unsplash.jpg',
        sidebar: false
      }
    },
    computed: {
      appTitle () {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      isLecturer () {
        let i = 0
        for (i = 0; i < this.lecturer.length; i++) {
          if (this.lecturer[i]['.key'] === 'lecturer') {
            return true
          }
        }
        console.log('after function')
        return false
      },
      menuItems () {
        if (this.isAuthenticated && !this.isLecturer) {
          return [
            { title: 'Home', path: '/home', icon: 'home' },
            { title: 'Profile', path: '/profile', icon: 'face' },
            { title: 'Add Courses', path: '/setup', icon: 'home' },
            { title: 'Dashboard', path: '/dashboard', icon: 'D' }
          ]
        } else if (this.isAuthenticated && this.isLecturer) {
          return [
            { title: 'Home', path: '/home', icon: 'home' },
            { title: 'LecturerBoard', path: '/lecturerboard', icon: 'home' },
            { title: 'Add Courses', path: '/lectureraddcourse', icon: 'home' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    },
    firebase: function () {
      return {
        lecturer: {
          source: db.ref('lecturers/' + auth.currentUser.uid)
        }
      }
    }
  }
</script>
