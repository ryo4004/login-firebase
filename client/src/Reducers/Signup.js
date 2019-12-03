import * as ActionType from '../Actions/Constants/Signup'

const initialState = {
  loading: false,
  email: '',
  password: '',
  err: false
}

export default function signupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.SIGNUP_CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload.email
      }
    case ActionType.SIGNUP_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }
    case ActionType.SIGNUP_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}