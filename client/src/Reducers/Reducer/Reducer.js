import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from '../Login'
import signupReducer from '../Signup'
import sessionReducer from '../Session'

import toastReducer from '../Toast'

export default (history) => combineReducers({
  login: loginReducer,
  signup: signupReducer,
  session: sessionReducer,

  toast: toastReducer,

  // The key must be router
  router: connectRouter(history)
})