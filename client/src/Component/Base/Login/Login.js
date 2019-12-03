import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  changeEmail,
  changePassword,
  requestLogin,
  setError
} from '../../../Actions/Actions/Login'

import './Login.css'

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  email: state.login.email,
  password: state.login.password,
  err: state.login.err
})

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(changeEmail(email)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestLogin: () => dispatch(requestLogin()),
  setError: (err) => dispatch(setError(err))
})

const Login = ({
  loading, email, password, err,
  changeEmail, changePassword, requestLogin, setError
}) => {

  useEffect(() => {
    setError(false)
    return () => setError(false)
  }, [])

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankTextbox':
        message = '入力を確認してください'
        break
      // Server Error
      case 'userNotFound':
        message = 'ユーザが見つかりません'
        break
      case 'passwordWrong':
        message = 'パスワードが間違っています'
        break
      case 'updateUserNotFound':
        message = 'データアップデートエラー'
        break
      case 'updateUserError':
        message = 'データベースエラー'
        break
      default:
        message = 'error: ' + err.type
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  const buttonLabel = loading ? '読み込み中' : 'ログイン'

  return (
    <div className='login'>
      <div>
        <h2>ログイン</h2>
        <input type='text' value={email} onChange={(e) => changeEmail(e.target.value)} placeholder='Email' />
        <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} placeholder='Password' />
        {showError()}
        <button onClick={() => requestLogin()} onTouchStart={() => {}}>{buttonLabel}</button>
        <div className='add-account'><Link to='/signup'>Create Account</Link></div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)