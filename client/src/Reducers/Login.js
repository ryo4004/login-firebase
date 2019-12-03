import * as ActionType from '../Actions/Constants/Login'

const initialState = {
  loading: false,
  email: '',
  password: '',
  err: false
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.LOGIN_CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload.email
      }
    case ActionType.LOGIN_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }
    case ActionType.LOGIN_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}