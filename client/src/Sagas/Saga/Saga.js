import { all, fork } from 'redux-saga/effects'

import Authentication from '../Authentication'
import Signup from '../Signup'
import Login from '../Login'
import Toast from '../Toast'

export default function* rootSaga () {
  yield all([
    fork(Authentication),
    fork(Signup),
    fork(Login),
    fork(Toast)
  ])
}