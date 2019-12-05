import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import firebase from '../firebase'

import * as ActionType from '../Actions/Constants/Authentication'
import { loadingAuthentication, setUser, setError } from '../Actions/Actions/Authentication'
import { loadingLogin } from '../Actions/Actions/Login'
import { loadingSignup } from '../Actions/Actions/Signup'
import { showToast } from '../Actions/Actions/Toast'

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
      resolve({response})
    }).catch((error) => {
      console.warn(error)
      resolve({error})
    })
  })
}

const login = (email, password) => {
  return new Promise((resolve) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log(response)
      resolve({response})
    }).catch((error) => {
      console.warn(error)
      resolve({error})
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
  const signupResponse = yield call(() => signup(state.signup.email, state.signup.password))
  const idToken = yield call(() => getToken(signupResponse.response.user))
  yield put(loadingSignup(false))
  console.log('result', {signupResponse, idToken})
  if (signupResponse.response.user) {
    yield put(setUser(signupResponse.response.user))
    yield put(replace('/home'))
    yield put(showToast('ログインしました'))
  } else {
    yield put(setUser(false))
  }
}

function* runRequestLogin () {
  console.log('runRequestLogin')
  const state = yield select()
  if (!state.login.email || !state.login.password) return yield put(setError({type: 'blankTextbox'}))
  yield put(loadingLogin(true))
  const loginResult = yield call(() => login(state.login.email, state.login.password))
  const idToken = yield call(() => getToken(loginResult.response.user))
  yield put(loadingLogin(false))
  console.log('result', {loginResult, idToken})
  if (loginResult.response.user) {
    yield put(setUser(loginResult.response.user))
    yield put(replace('/home'))
    yield put(showToast('ログインしました'))
  } else {
    yield put(setUser(false))
  }
}

function* runRequestLogout () {
  console.log('runRequestLogout')
  yield put(loadingAuthentication(true))
  const response = yield call(() => logout())
  yield put(loadingAuthentication(false))
  console.log('result', {response})
  yield put(replace('/login'))
  yield put(showToast('ログアウトしました'))
}

export default function* watchRequest () {
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_AUTHENTICATION, runRequestAuthentication)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_SIGNUP, runRequestSignup)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGIN, runRequestLogin)
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGOUT, runRequestLogout)
}