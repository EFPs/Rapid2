import Vue from 'vue'
import Router from 'vue-router'
// import firebase from 'firebase'
import Home from '@/components/Home'
import Landing from '@/components/Landing'
// import NotFound from '@/components/NotFound'

import LecturerSignup from '@/components/LecturerSignup'
import LecturerBoard from '@/components/LecturerBoard'
import LecturerAddCourse from '@/components/LecturerAddCourse'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Setup from '@/components/Setup'
import Profile from '@/components/Profile'
import {auth, db} from '../firebase'
import EditProfile from '@/components/EditProfile'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const AuthGuard = (to, from, next) => {
  if (auth.currentUser) {
    next()
  } else {
    next('/signin')
  }
}

function check (l, to, from, next) {
  let allow = l
  console.log(allow === true)
  console.log('Allow : ' + allow)
  if (auth.currentUser && allow) {
    console.log('guiding lecturer....')
    next()
  } else {
    next('/signin')
  }
}

const LectGuard = (to, from, next) => {
  // const lect = db.ref('lecturers/' + auth.currentUser.uid)
  // let allow = false
  // let i = 0
  // // console.log(lect.length)
  // for (i = 0; i < this.lecturer.length; i++) {
  //   console.log(this.lecturer[i]['.key'])
  //   if (this.lecturer[i]['.key'] === 'lecturer') {
  //     console.log('found')
  //     allow = true
  //   }
  // }
  try {
    db.ref('lecturers/' + auth.currentUser.uid)
    .once('value').then(function (snapshot) {
      check(snapshot.val().lecturer, to, from, next)
    })
  } catch (e) {
    next('/signin')
  }
}

// export default router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/sl',
      name: 'LecturerSignup',
      component: LecturerSignup
    },
    {
      path: '/lecturerboard',
      name: 'LecturerBoard',
      component: LecturerBoard,
      beforeEnter: LectGuard
    },
    {
      path: '/lectureraddcourse',
      name: 'LecturerAddCourse',
      component: LecturerAddCourse,
      beforeEnter: LectGuard
    },
    {
      path: '/edit',
      name: 'EditProfile',
      component: EditProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    }
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: NotFound
    // }
  ],
  mode: 'history'
})
