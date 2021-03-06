import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from './firebase'
import VueFire from 'vuefire'
import CGrid from 'vue-cheetah-grid'
import 'vue-material-design-icons/styles.css'
import MenuIcon from 'vue-material-design-icons/menu.vue'
import DeleteIcon from 'vue-material-design-icons/delete.vue'
import FolderAccountIcon from 'vue-material-design-icons/folder-account.vue'
/* eslint-disable */
Vue.use(Vuetify, {
  theme: {
    // primary: "#f44336",
    // secondary: "#e57373",
    // accent: "#9c27b0",
    // error: "#f44336",
    // warning: "#ffeb3b",
    // info: "#2196f3",
    // success: "#4caf50",
    primary: "#FF6D00",
    secondary: "#8BC34A",
    accent: "#D500F9",
    error: "#F44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50",
    facebook: "#3B5998",
    google: "#db3236",
    textBox: "#000000",
    b: "#FFFFFF"
  }
})

Vue.use(VueFire);
Vue.use(CGrid);
Vue.component("menu-icon", MenuIcon)
Vue.component("delete-icon", DeleteIcon)
Vue.component("folder-account-icon", FolderAccountIcon)

Vue.config.productionTip = false

const unsubscribe = firebase.auth()

  .onAuthStateChanged((firebaseUser) => {

  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }else{
        router.push('/signin')
      }
    }
  })
  unsubscribe()
})
