import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Authentication'
import { setUser, setError } from '../Actions/Actions/Authentication'
import { loadingSignup } from '../Actions/Actions/Signup'
import { showToast } from '../Actions/Actions/Toast'

import { signup, getToken } from './Firebase/Authentication'

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
    yield put(showToast('登録しました'))
  } else {
    yield put(setUser(false))
  }
}

export default function* watchRequest () {
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_SIGNUP, runRequestSignup)
}