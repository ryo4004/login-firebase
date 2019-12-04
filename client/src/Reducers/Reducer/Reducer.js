import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import sessionReducer from '../Session'
import statusReducer from '../Status'
import toastReducer from '../Toast'

import loginReducer from '../Login'
import signupReducer from '../Signup'

import authenticationReducer from '../Authentication'

export default (history) => combineReducers({
  session: sessionReducer,
  status: statusReducer,
  toast: toastReducer,

  login: loginReducer,
  signup: signupReducer,

  authentication: authenticationReducer,

  // The key must be router
  router: connectRouter(history)
})