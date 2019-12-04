import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import firebase from '../firebase'

import * as ActionType from '../Actions/Constants/Authentication'
import { loadingAuthentication, setId, setUser, setError } from '../Actions/Actions/Authentication'
import { loadingLogin } from '../Actions/Actions/Login'
import { loadingSignup } from '../Actions/Actions/Signup'

const getToken = (user) => {
  if (!user) return
  return new Promise((resolve) => {
    if (!user) resolve(false)
    user.getIdToken().then((idToken) => resolve(idToken))
  })
}

const auth = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => resolve(user))
  })
}

const signup = (email, password) => {
  return new Promise((resolve) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      console.log(response)
      resolve(response.user)
    }).catch((err) => {
      console.warn(err)
      resolve(err)
    })
  })
}

const login = (email, password) => {
  return new Promise((resolve) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log(response)
      resolve(response.user)
    }).catch((err) => {
      console.warn(err)
      resolve(err)
    })
  })
}

const logout = () => {
  return new Promise((resolve) => {
    firebase.auth().signOut().then((response) => resolve(response))
  })
}

function* runRequestAuthentication () {
  console.log('runRequestAuthentication')
  yield put(loadingAuthentication(true))
  const user = yield call(() => auth())
  const idToken = yield call(() => getToken(user))
  yield put(loadingAuthentication(false))
  console.log('result', {user, idToken})
  yield put(setUser(user))
  yield put(user ? replace('/home') : replace('/login'))
}

function* runRequestSignup () {
  console.log('runRequestSignup')
  const state = yield select()
  if (!state.signup.email || !state.signup.password) return yield put(setError({type: 'blankTextbox'}))
  yield put(loadingSignup(true))
  const user = yield call(() => signup(state.signup.email, state.signup.password))
  const idToken = yield call(() => getToken(user))
  yield put(loadingSignup(false))
  yield put(setUser(user))
  console.log('result', {user, idToken})
  yield put(user && replace('/home'))
}

function* runRequestLogin () {
  console.log('runRequestLogin')
  const state = yield select()
  if (!state.login.email || !state.login.password) return yield put(setError({type: 'blankTextbox'}))
  yield put(loadingLogin(true))
  const user = yield call(() => login(state.login.email, state.login.password))
  const idToken = yield call(() => getToken(user))
  yield put(loadingLogin(false))
  yield put(setUser(user))
  console.log('result', {user, idToken})
  yield put(user && replace('/home'))
}

function* runRequestLogout () {
  console.log('runRequestLogout')
  yield put(loadingAuthentication(true))
  const user = yield call(() => logout())
  yield put(loadingAuthentication(false))
  console.log('result', {user})
  yield put(replace('/login'))
}

export default function* watchRequest () {
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_AUTHENTICATION, runRequestAuthentication)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_SIGNUP, runRequestSignup)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGIN, runRequestLogin)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGOUT, runRequestLogout)
}