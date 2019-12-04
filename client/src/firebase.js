import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBw4UsnojSbP99-esxYUMDiO0wIXZmZPF8",
  authDomain: "login-5e3b2.firebaseapp.com",
  databaseURL: "https://login-5e3b2.firebaseio.com",
  projectId: "login-5e3b2",
  storageBucket: "login-5e3b2.appspot.com",
  messagingSenderId: "206446295717",
  appId: "1:206446295717:web:2b75d1f8d8f4f1f035eb4c",
  measurementId: "G-D5W4DF5QS0"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase