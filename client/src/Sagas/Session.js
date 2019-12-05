import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Session'
import { loadingSession, setUser, setError } from '../Actions/Actions/Session'
import { showToast } from '../Actions/Actions/Toast'

import { auth, getToken, logout } from './Firebase/Authentication'

function* runRequestAuthentication () {
  console.log('runRequestAuthentication')
  yield put(loadingSession(true))
  const user = yield call(() => auth())
  const idToken = yield call(() => getToken(user))
  yield put(loadingSession(false))
  console.log('result', {user, idToken})
  yield put(setUser(user))
  yield put(user ? replace('/home') : replace('/login'))
}

function* runRequestLogout () {
  console.log('runRequestLogout')
  yield put(loadingSession(true))
  const response = yield call(() => logout())
  yield put(loadingSession(false))
  console.log('result', {response})
  yield put(replace('/login'))
  yield put(showToast('ログアウトしました'))
}

export default function* watchRequest () {
  yield takeLatest(ActionType.SESSION_REQUEST_AUTHENTICATION, runRequestAuthentication)
  yield takeLatest(ActionType.SESSION_REQUEST_LOGOUT, runRequestLogout)
}