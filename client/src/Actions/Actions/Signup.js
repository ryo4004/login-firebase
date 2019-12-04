import * as ActionType from '../Constants/Signup'

export const loadingSignup = (loading) => ({
  type: ActionType.SIGNUP_LOADING,
  payload: { loading }
})

export const changeEmail = (email) => ({
  type: ActionType.SIGNUP_CHANGE_EMAIL,
  payload: { email }
})

export const changePassword = (password) => ({
  type: ActionType.SIGNUP_CHANGE_PASSWORD,
  payload: { password }
})

export const requestSignup = () => ({
  type: ActionType.SIGNUP_REQUEST_SIGNUP
})

export const setError = (err) => ({
  type: ActionType.SIGNUP_SET_ERROR,
  payload: { err }
})