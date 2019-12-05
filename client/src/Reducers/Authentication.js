import * as ActionType from '../Actions/Constants/Authentication'

const initialState = {
  loading: false,
  id: '',
  user: '',
  err: false
}

export default function authenticationReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.AUTHENTICATION_SET_ID:
      return {
        ...state,
        id: action.payload.id
      }
    case ActionType.AUTHENTICATION_SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case ActionType.AUTHENTICATION_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}