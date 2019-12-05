import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Login'
import { setUser } from '../Actions/Actions/Session'
import { loadingLogin, changeEmail, changePassword, setError } from '../Actions/Actions/Login'
import { showToast } from '../Actions/Actions/Toast'

import { login, getToken } from './Firebase/Authentication'

function* runRequestLogin () {
  console.log('runRequestLogin')
  const state = yield select()
  if (!state.login.email || !state.login.password) return yield put(setError({code: 'blankTextbox'}))
  yield put(loadingLogin(true))
  const loginResult = yield call(() => login(state.login.email, state.login.password))
  const idToken = loginResult.response ? yield call(() => getToken(loginResult.response.user)) : false
  yield put(loadingLogin(false))
  console.log('result', {loginResult, idToken})
  if (loginResult.response) {
    yield put(setUser(loginResult.response.user))
    yield put(changeEmail(''))
    yield put(changePassword(''))
    yield put(replace('/home'))
    yield put(showToast('ログインしました'))
  } else {
    yield put(setUser(false))
    yield put(setError({code: loginResult.error.code, message: loginResult.error.message}))
  }
}

export default function* watchRequest () {
  yield takeLatest(ActionType.LOGIN_REQUEST_LOGIN, runRequestLogin)
}