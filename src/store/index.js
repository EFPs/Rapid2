import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '@/firebase'
import router from '@/router'
import {auth, db} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'Skyer',
    user: null,
    error: null,
    loading: false,
    major: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setMajor (state, payload) {
      state.major = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        auth.currentUser.updateProfile({ displayName: payload.firstName })
        console.log('auth', auth)
        console.log('user', auth.currentUser)
        db.ref('users/' + auth.currentUser.uid).set({ sid: payload.sid, email: payload.email, firstName: payload.firstName, lastName: payload.lastName, major: payload.major, lecturer: false })
        db.ref('users/' + auth.currentUser.uid + '/takenCourses').set({ cid: 'test' })
        commit('setLoading', false)
        router.push('/setup')
      })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    LecturerSignUp ({commit}, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.email})
          auth.currentUser.updateProfile({ displayName: payload.firstName })
          db.ref('lecturers/' + auth.currentUser.uid).set({ email: payload.email, firstName: payload.firstName, lastName: payload.lastName, major: payload.major, lecturer: true })
          commit('setLoading', false)
          router.push('/setup')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    autoSignIn ({commit}, payload) {
      // commit('setUser', {email: payload.email})
      commit('setUser', payload)
      console.log('From Store User', this.state.user, payload)
    },
    userSignOut ({commit}) {
      auth.signOut()
      commit('setUser', null)
      router.push('/')
    },
    socialMediaSignUp ({commit}, payload) {
      commit('setUser', payload)
      router.push('/home')
    },
    getMajor ({commit}) {
      console.log(this.state.user.uid)
      db.ref('lecturers/' + this.state.user.uid)
        .once('value').then(function (snapshot) {
          console.log(snapshot.val().major)
          console.log(snapshot.val().major.toLowerCase())
          commit('setMajor', snapshot.val().major.toLowerCase())
        })
    },
    lectAddCourse ({commit}, payload) {
      db.ref('lecturers/' + this.state.user.uid).update(
        { courses: payload }
      )
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    getUser (state) {
      return state.user
    },
    isLecturer (state) {
      db.ref('lecturers/' + state.user.uid)
        .once('value').then(function (snapshot) {
          console.log(snapshot.val().lecturer)
          return snapshot.val().lecturer
        })
    }
  }
})
