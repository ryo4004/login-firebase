import * as ActionType from '../Constants/Login'

export const loadingLogin = (loading) => ({
  type: ActionType.LOGIN_LOADING,
  payload: { loading }
})

export const changeEmail = (email) => ({
  type: ActionType.LOGIN_CHANGE_EMAIL,
  payload: { email }
})

export const changePassword = (password) => ({
  type: ActionType.LOGIN_CHANGE_PASSWORD,
  payload: { password }
})

export const requestLogin = () => ({
  type: ActionType.LOGIN_REQUEST_LOGIN
})

export const setError = (err) => ({
  type: ActionType.LOGIN_SET_ERROR,
  payload: { err }
})