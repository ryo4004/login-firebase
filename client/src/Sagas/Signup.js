import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Signup'
import { post } from '../Library/Request'

import { loading, changeEmail, changePassword, setError } from '../Actions/Actions/Signup'

// import * as lib from '../Library/Library'

function* runRequestSignup () {
  console.log('runRequestSignup')
  const state = yield select()
  if (!state.signup.email || !state.signup.password) return yield put(setError({type: 'blankTextbox'}))
  // if (!state.signup.agreement) return yield put(setError({type: 'notAgreement'}))
  // yield put(loading(true))
  // yield put(setError(false))
  // const send = {
  //   email: state.signup.email,
  //   password: state.signup.password,
  //   clientid: lib.getClientid(),
  //   userAgent: window.navigator.userAgent,
  //   version: lib.version
  // }
  // const res = yield call(() => post('/signup', send))
  // yield put(loading(false))
  // yield put(changePassword(''))
  // yield put(changeAgreement(false))
  // if (res.body.err) {
  //   yield put(setError(res.body.err))
  // } else {
  //   yield put(setError(false))
  //   yield put(changeEmail(''))
  //   yield put(setUser(res.body.user))
  //   yield call(() => lib.updateToken(res.body.token))
  //   yield call(() => lib.updateemail(res.body.user.email))
  //   yield put(replace('/payment'))
  //   yield put(setModal(true))
  // }
}

export default function* watchRequestSignup () {
  yield takeLatest(ActionType.SIGNUP_REQUEST_SIGNUP, runRequestSignup)
}