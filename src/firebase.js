import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCGg0dzROQaUS93cueTMgatU9kGEpo6pZQ',
  authDomain: 'skyer-499ee.firebaseapp.com',
  databaseURL: 'https://skyer-499ee.firebaseio.com',
  projectId: 'skyer-499ee',
  storageBucket: 'skyer-499ee.appspot.com',
  messagingSenderId: '736020680877'
}

firebase.initializeApp(config)

export default firebase
export const db = firebase.database()
export const auth = firebase.auth()
export const faceProvider = new firebase.auth.FacebookAuthProvider();
export const gooProvider = new firebase.auth.GoogleAuthProvider();
