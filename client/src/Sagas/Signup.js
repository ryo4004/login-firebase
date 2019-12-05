import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Authentication'
import { setUser, setError } from '../Actions/Actions/Authentication'
import { loadingSignup, changeEmail, changePassword } from '../Actions/Actions/Signup'
import { showToast } from '../Actions/Actions/Toast'

import { signup, getToken } from './Firebase/Authentication'

function* runRequestSignup () {
  console.log('runRequestSignup')
  const state = yield select()
  if (!state.signup.email || !state.signup.password) return yield put(setError({type: 'blankTextbox'}))
  yield put(loadingSignup(true))
  const signupResult = yield call(() => signup(state.signup.email, state.signup.password))
  const idToken = signupResult.response ? yield call(() => getToken(signupResult.response.user)) : false
  yield put(loadingSignup(false))
  console.log('result', {signupResult, idToken})
  if (signupResult.response) {
    yield put(setUser(signupResult.response.user))
    yield put(changeEmail(''))
    yield put(changePassword(''))
    yield put(replace('/home'))
    yield put(showToast('登録しました'))
  } else {
    yield put(setUser(false))
  }
}

export default function* watchRequest () {
  yield takeLatest(ActionType.AUTHENTICATION_REQUEST_SIGNUP, runRequestSignup)
}