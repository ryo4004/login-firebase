import * as ActionType from '../Constants/Authentication'

export const loadingAuthentication = (loading) => ({
  type: ActionType.AUTHENTICATION_LOADING,
  payload: { loading }
})

export const requestAuth = () => ({
  type: ActionType.AUTHENTICATION_REQUEST_AUTHENTICATION
})

export const requestLogout = () => ({
  type: ActionType.AUTHENTICATION_REQUEST_LOGOUT
})

export const setId = (id) => ({
  type: ActionType.AUTHENTICATION_SET_ID,
  payload: { id }
})

export const setUser = (user) => ({
  type: ActionType.AUTHENTICATION_SET_USER,
  payload: { user }
})

export const setError = (err) => ({
  type: ActionType.AUTHENTICATION_SET_ERROR,
  payload: { err }
})