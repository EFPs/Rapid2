import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '@/firebase'
import router from '@/router'
import {auth, db} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false
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
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        auth.signInWithEmailAndPassword(payload.email, payload.password)
        db.ref('users/' + payload.sid).push({ sid: payload.sid, email: payload.email, firstName: payload.firstName, lastName: payload.lastName, major: payload.major })
        commit('setLoading', false)
        router.push('/home')
      }).then(firebaseUser => { console.log('Current User ', auth.currentUser, this.isAuthenticated()) })
        // .then(firebaseUser => { db.ref('users/' + payload.sid).push({ sid: payload.sid, email: payload.email, firstName: payload.firstName, lastName: payload.lastName, major: payload.major }) })
        // .then(firebaseUser => { console.log('Current User ', auth.currentUser) })
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
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      auth.signOut()
      commit('setUser', null)
      router.push('/')
    },
    socialMediaSignUp ({commit}, payload) {
      commit('setUser', payload)
      router.push('/home')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
