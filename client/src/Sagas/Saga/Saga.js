import { all, fork } from 'redux-saga/effects'

import Session from '../Session'
import Signup from '../Signup'
import Login from '../Login'
import Toast from '../Toast'

export default function* rootSaga () {
  yield all([
    fork(Session),
    fork(Signup),
    fork(Login),
    fork(Toast)
  ])
}