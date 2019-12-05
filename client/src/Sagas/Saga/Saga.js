import { all, fork } from 'redux-saga/effects'

import Authentication from '../Authentication'
import Toast from '../Toast'

export default function* rootSaga () {
  yield all([
    fork(Authentication),
    fork(Toast)
  ])
}