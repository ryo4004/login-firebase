import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Authentication'
import { loadingAuthentication, setUser, setError } from '../Actions/Actions/Authentication'
import { showToast } from '../Actions/Actions/Toast'

import { auth, getToken, logout } from './Firebase/Authentication'

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
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGOUT, runRequestLogout)
}