import * as ActionType from '../Constants/Session'

export const loadingSession = (loading) => ({
  type: ActionType.SESSION_LOADING,
  payload: { loading }
})

export const requestAuthentication = () => ({
  type: ActionType.SESSION_REQUEST_AUTHENTICATION
})

export const requestLogout = () => ({
  type: ActionType.SESSION_REQUEST_LOGOUT
})

export const setId = (id) => ({
  type: ActionType.SESSION_SET_ID,
  payload: { id }
})

export const setUser = (user) => ({
  type: ActionType.SESSION_SET_USER,
  payload: { user }
})

export const setError = (err) => ({
  type: ActionType.SESSION_SET_ERROR,
  payload: { err }
})