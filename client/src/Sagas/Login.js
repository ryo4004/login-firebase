import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Authentication'
import { setUser, setError } from '../Actions/Actions/Authentication'
import { loadingLogin } from '../Actions/Actions/Login'
import { showToast } from '../Actions/Actions/Toast'

import { login, getToken } from './Firebase/Authentication'

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

export default function* watchRequest () {
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_LOGIN, runRequestLogin)
}